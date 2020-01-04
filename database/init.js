

var autoIncrement = require('mongoose-auto-increment');
var autoIncrement = require('mongoose-plugin-autoinc').autoIncrement;



module.exports =function(mongoose){
    initAdmin(mongoose);
    initEspece(mongoose);
    initSousEspece(mongoose);
    initSpecimen(mongoose);



}

function initAdmin(mongoose){

    
    var AdminSchema=new mongoose.Schema({
        code:{type:Number,unique:true},
        nom:{type:String},
        adresse:{type:String},
        password:{type:String,required:true},
        sexe:{type:String}  ,      
        age_naissance : {type:Date },
        niveu:{type:Number},
        code_createur:{type:Number},
        code_modificateur:{type:Number},
        date_creation:{type:Date,default:new Date()},
        statut :{type:Number,default:1} });

        AdminSchema.plugin(autoIncrement,{model:"Admin",field:"code"});
        console.log("Schéma admin créé avec succès");

    var adminModel=mongoose.model('admin',AdminSchema);
      var defaultAdmin=new adminModel({nom:"DEF",sexe:"F",password:"12345678" ,code_createur:-10});
      defaultAdmin.save(function (err) {
        if (err) { throw err; }
        console.log('Adminsitrateur par défaut ajouté avec succès')}  
      );



}


function initEspece(mongoose){
var EspeceSchema=new mongoose.Schema({
code:{type:Number,unique:true},
nom:{type:String,required:true,unique:true},
description:{type:String},
code_createur:{type:Number},
code_modificateur:{type:Number},
date_creation:{type:Date,default:new Date()},
statut :{type:Number,default:1} })
;

EspeceSchema.plugin(autoIncrement,{model:"Espece",field:"code"});
var especeModel=mongoose.model('Espece',EspeceSchema);
var maisEspece=new especeModel({
nom:"maïs rouge",
code_createur:-10});
maisEspece.save(function (err) {
    if (err) { throw err; }
    console.log('Espèce enregistrée avec succès: %o', maisEspece.code)}  
  );



;

}


    

    
function initSousEspece(mongoose){
    var SousEspeceSchema=new mongoose.Schema({
    
    code:{type:Number,unique:true},
    code_espece:{type:Number,required:true},
    nom:{type:String,required:true},
    description:{type:String},
    code_createur:{type:Number},
    code_modificateur:{type:Number},
    date_creation:{type:Date,default:new Date()},
    statut :{type:Number,default:1} })
    var SousEspeceModel=mongoose.model("SousEspece",SousEspeceSchema)
    SousEspeceSchema.plugin(autoIncrement,{model:"SousEspece",field:"code"})
    
    ;
    }





function initSpecimen(mongoose){
    var SpecimenSchema=new mongoose.Schema({
        code:{type:Number,unique:true},
        date_semis:{type:Date},
        indice_croissange:{type:Number},
        indice_performance:{type:Number},
        localisation:{type:Object}, 
        code_createur:{type:Number},
    code_modificateur:{type:Number},
    date_creation:{type:Date,default:new Date()},
    statut :{type:Number,default:1} })    
        SpecimenSchema.plugin(autoIncrement,{model:"Specimen",field:"code"})

var SpecimenModel=mongoose.model("Specimen",SpecimenSchema);







}