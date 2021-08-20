console.log('dataviz.js OK');

// Homme/Femmes
var ctx = document.getElementById("chartBar");

new Chart(ctx, {

    type: 'bar',
    data: {
       labels: ["Hommes", "Femmes"],
       datasets: [{
            
           data:[ctx.dataset.male, ctx.dataset.female],

           backgroundColor: [
            'blue',
            'pink',
           ],
       
       }]
    }
});

// Messages non lus/lus
var ctx = document.getElementById("doughnut");

new Chart(ctx, {

    type: 'doughnut',
    data: {
       labels: ["Messages lus", "Messages non-lus"],
       datasets: [{
            label: 'Messages',
           data:[ctx.dataset.read, ctx.dataset.noread],

           backgroundColor: [
            'green',
            'red',
           ],
       
       }]
    }
});

// Commandes envoyés ou non
var ctx = document.getElementById("chartpie");

new Chart(ctx, {

    type: 'pie',
    data: {
       labels: ["Commandes envoyées", "À envoyer"],
       datasets: [{
            label: 'Status des commandes payées',
           data:[ctx.dataset.ship, ctx.dataset.noship],

           backgroundColor: [
            'green',
            'red',
           ],
       
       }]
    }
});

// Chiffre d'affaire
var ctx = document.getElementById("linechart");

new Chart(ctx, {

    type: 'line',
    data: {
       labels: ["Avril", "Aout", "Octobre"],
       datasets: [{
            label: "Chiffre d'affaire",
           data:[ctx.dataset.avril, ctx.dataset.aout, ctx.dataset.octobre],

       
       }]
    }
});
