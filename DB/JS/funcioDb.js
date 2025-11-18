//---Bibliotecas e funcionamentos---
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();

// Flag para controlar o estado do banco
let dbConnected = false;

//Dados do Servidor
const porta = 3030;
app.use(express.json());
app.use(cors());

//Modulos
const salasDB = require('../Modulos/salaDb');
const funcionarioDB = require('../Modulos/funcionariosDb');
const cursoDB = require('../Modulos/cursoDb');
const keyStrangerDB = require('../Modulos/keyStrangerFuncDb');

const creaTabl = [
    salasDB.creatTableSalas,
    funcionarioDB.creatTableFuncionarios,
    cursoDB.creaTableCursos,
    keyStrangerDB.creaTable
]

function creaTableDb(db,index=0){
    if(index >= creaTabl.length){
        app.listen(porta, () => {
        });
        return;
    }

    const creatFunction = creaTabl[index];

    creatFunction(db, (err) => {
        if(err){
            process.exit(1);
        }
        creaTableDb(db, index + 1);
    });  
}


const db = new sqlite3.Database("../labLivreDb.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) =>{
    if(err){
        process.exit(1);
    } else{
        dbConnected = true;
        creaTableDb(db);
    }
});