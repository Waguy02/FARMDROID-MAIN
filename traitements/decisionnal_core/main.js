

const fs = require('fs');
var pl = require("tau-prolog");
const NORMAL_MAIZE = "mais_normal"
//const Mesure = require('../../API REST/models/Mesure');









const STANDARD = "standard";
const W_ESTIMATION = "water_estimation";
const N_ESTIMATION = "n_estimation";
const P_ESTIMATION = "p_estimation";
const K_ESTIMATION = "k_estimation";








function estimate(specie, mesures) {

    rules=loadRules(specie);
    console.log(rules);
    var session = pl.create(1000);
    
    session.consult(rules.get(STANDARD));

}









function loadRules(specie) {
    rules = new Map();

    const standard = fs.readFileSync('../rules/' + specie + '/standard.pl', 'utf8');
    rules.set(STANDARD, standard);

    const water_estimation=fs.readFileSync('../rules/' + specie + '/water_estimation.pl', 'utf8');
    rules.set(W_ESTIMATION,water_estimation);


    const n_estimation=fs.readFileSync('../rules/' + specie + '/n_estimation.pl', 'utf8');
    rules.set(N_ESTIMATION,n_estimation);

    const p_estimation=fs.readFileSync('../rules/' + specie + '/p_estimation.pl', 'utf8');
    rules.set(P_ESTIMATION,p_estimation);

    const k_estimation=fs.readFileSync('../rules/' + specie + '/k_estimation.pl', 'utf8');
    rules.set(K_ESTIMATION,k_estimation);


return rules;

}




function consultStandard(rules) {


}




function estimateWater(rules, mesures) {
    var session=pl.create();
    /*la regle que j'ai ajouté vient du fait que si on met une certaine
     quantité d'eau par jour et qu'on connait quelle sont les pertes occasionnées, 
     on demandera l'apport de cette quantité ajouté des pertes succeptibles d'etre engendrées
      (qui sont les memes potentiellement) et soustrait de la mesure faite 
      on va d'abord determiner une premieere valeur grace a prolog avant la soustraire aux mesures apres  
    */
    var array=[rules.get("W_ESTIMATION"),rules.get("STANDARD"),rules.get("K_ESTIMATION"),rules.get("P_ESTIMATION"),rules.get("N_ESTIMATION"),"W_need(X+Y):- eau_jour(X),dimunition_eau(Y)"];
    var parsed=session.consult(array); 
    var eau_jour=session.query("?- eau_jour(X).")
    var besoin_eau=eau_jour;
    var tmp=true;
    var callback1 = function( answer ) { 
        
        var test= pl.format_answer( answer ).split("=") ;// car le resultat est une egalité genre X=0.9 par exemple 
        eau_jour=test[test.lenght-1]
    };
    session.answer( callback1 ); // eau_jour aurra pris la valeur souhaitée
    
    
    var result=session.query("?- W_need(X).")

    var callback = function( answer ) { 
        tmp=pl.format_answer( answer );

        if (tmp!=false) {
// car on peut ne peut avoir de resultat directement car la plante peut ne pas avoir besoin d'eau
            var test=tmp.split("=");
            besoin_eau=besoin_eau+test[test.lenght-1]-eau_jour ; 
        }
       
    };
    while (tmp!=false) {
        session.answer( callback ); // on additionne les besoins
    }
    
    
//il me faurt savoir comment recuperer la quantité d'eau journaliere et aussi la mesure d'eau enregistrée 
    var prediction=besoin_eau-mesures;


 if (prediction>=0)
 {
    return prediction;
 }

else {
return "Rien pour le moment";
}
   
}


function estimateN_Need(rules, mesures) {

}

function estimateK_Need(rules, mesures) {


}


function estimateP_Need(rules, mesures) {


}










estimate(NORMAL_MAIZE,null);


var mesures=0.2;

var espece="mais_normal";
var rules=loadRules(espece);

var resul=estimateWater(rules,escape);

console.log(resul)