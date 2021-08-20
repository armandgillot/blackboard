var express = require('express');
var router = express.Router();

var articleModel = require('../models/articles')
var orderModel = require('../models/orders')
var clientsModel = require('../models/clients')

/* GET home page. */
router.get('/', async (req, res, next) => {

  //Petites cases de stats en haut
  var articles = await articleModel.find({ stock: 0 });
  var clients = await clientsModel.findOne({ _id: "5c52e4efaa4beef85aad5e52" });

  var compteurNoRead = 0;
  for (let i = 0; i < clients.messages.length; i++) {
    if (clients.messages[i].read == false) {
      compteurNoRead++;
    }
  }

  var tasksNonCloture = 0;
  for (let i = 0; i < clients.tasks.length; i++) {
    if (clients.tasks[i].dateCloture) {
      tasksNonCloture++;
    }
  }

  res.render('index', { articles, compteurNoRead, tasksNonCloture });
});

/* GET tasks page. */
router.get('/tasks-page', async (req, res, next) => {
  var clients = await clientsModel.findOne({ _id: "5c52e4efaa4beef85aad5e52" });
  res.render('tasks', { tasks: clients.tasks });
});

/* GET Messages page. */
router.get('/messages-page', async (req, res, next) => {
  var clients = await clientsModel.findOne({ _id: "5c52e4efaa4beef85aad5e52" });
  res.render('messages', { messages: clients.messages });
});

/* GET Users page. */
router.get('/users-page', async (req, res, next) => {
  var clients = await clientsModel.find({ status: "customer" });
  res.render('users', { clients });
});

/* GET Catalog page. */
router.get('/catalog-page', async function (req, res, next) {

  var articles = await articleModel.find();

  res.render('catalog', { articles });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function (req, res, next) {

  var orders = await orderModel.find();

  res.render('orders-list', { orders });
});

/* GET Order detail page. */
router.get('/order-page', async function (req, res, next) {

  var order = await orderModel.findById(req.query.id)
    .populate('articles')
    .exec()

  res.render('order', { order });
});

/* GET chart page. */
router.get('/charts', async (req, res, next) => {

  // Graphiques Hommes Femmes
  var clientsStats = await clientsModel.find({ status: "customer" });
  var clientsMale = 0;
  var clientsFemale = 0;
  for (let i = 0; i < clientsStats.length; i++) {
    if (clientsStats[i].gender == "male") {
      clientsMale++;
    }
    if (clientsStats[i].gender == "female") {
      clientsFemale++;
    }
  }

  var clients = await clientsModel.findOne({ _id: "5c52e4efaa4beef85aad5e52" });
  // graphique de messsages lus
  // il y a déjà le compteur de messages non lus au début de la route..
  var compteurRead = 0;
  var compteurNoRead = 0;
  for (let i = 0; i < clients.messages.length; i++) {
    if (clients.messages[i].read == true) {
      compteurRead++;
    }
    if (clients.messages[i].read == false) {
      compteurNoRead++;
    }
  }

  // graphique de commandes envoyées ou non
  var orders = await orderModel.find()
  var compteurShip = 0;
  var compteurNoShip = 0;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status_payment == "validated" && orders[i].status_shipment == true) {
      compteurShip++;
    }
    if (orders[i].status_payment == "validated" && orders[i].status_shipment == false) {
      compteurNoShip++;
    }
  }

  // graphique de chiffre d'affaire
  var aggr = orderModel.aggregate()
console.log(aggr);
  aggr.match({ status_payment: "validated" })
console.log(aggr);
  aggr.group({ _id: {month: { $month: '$date_insert' } }, CA: { $sum: '$total' } })
  aggr.sort({ _id: 1 })
console.log(aggr);
  var totalCAByMonth = await aggr.exec()
console.log(totalCAByMonth);

  res.render('charts', {compteurNoRead, compteurRead, clientsMale, clientsFemale, compteurShip, compteurNoShip, totalCAByMonth});
});



module.exports = router;
