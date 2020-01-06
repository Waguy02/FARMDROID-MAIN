

const fs = require('fs');
var pl = require("tau-prolog");
const NORMAL_MAIZE = "mais_normal"

const Mesure = require('./Mesures');









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
    var array=[rules.get(W_ESTIMATION),rules.get(STANDARD),rules.get(K_ESTIMATION),rules.get(P_ESTIMATION),rules.get(N_ESTIMATION)];
    var parsed=session.consult(array.join("\n")); 
    var eau=session.query("eau_jour(X).")
    var eau_jour=0;
    var tampon;
    var callback1 = function( answer ) { 
        //console.log(pl.format_answer( answer ))
        var test= pl.format_answer( answer ).split("=") ;// car le resultat est une egalité genre X=0.9 par exemple 
        eau_jour=parseFloat(test[1])
       // console.log(eau_jour)
        
    };
    session.answer( callback1 ); // eau_jour aurra pris la valeur souhaitée
   //console.log(eau_jour)
    var besoin_eau=eau_jour;
    var result=session.query(" dimunition_eau(X).")

    var callback = function( answer ) { 
        tampon=pl.format_answer( answer );
       // console.log(tampon)
        if (tampon!="false.") {
// car on peut ne peut avoir de resultat directement car la plante peut ne pas avoir besoin d'eau
            var test=tampon.split("=");
            //console.log(tampon)
            besoin_eau=besoin_eau+parseFloat(test[1]) ; 
           // console.log(besoin_eau)
        }
        
        
       
    };
    while (tampon!="false.") {
        session.answer( callback ); // on additionne les besoins
    }
    
    
//il me faurt savoir comment recuperer la quantité d'eau journaliere et aussi la mesure d'eau enregistrée 
    

var prediction=besoin_eau-mesures;
//console.log(prediction)

 if (prediction>=0)
 {
    return prediction;
 }

else {
return "Rien à ajouter  pour le moment";
}
   
}


function estimateN_Need(rules, mesures) {

}

function estimateK_Need(rules, mesures) {


}


function estimateP_Need(rules, mesures) {


}










estimate(NORMAL_MAIZE,null);


var mesures=0.5;

var espece="mais_normal";
var rules=loadRules(espece);
console.log(Mesure.eau)
var resul=estimateWater(rules,Mesure.eau);


console.log("l'apport d'eau a faire est de:" + resul)