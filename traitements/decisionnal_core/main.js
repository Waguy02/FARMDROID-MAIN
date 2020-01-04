

const fs = require('fs');
var pl = require("tau-prolog");
const NORMAL_MAIZE = "mais_normal"
const Mesure = require('../../API REST/models/Mesure');









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



}


function estimateN_Need(rules, mesures) {

}

function estimateK_Need(rules, mesures) {


}


function estimateP_Need(rules, mesures) {


}










estimate(NORMAL_MAIZE,null);