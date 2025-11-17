//---Bibliotecas e funcionamentos---
const express = require("express");
const sqlite = require("sqlite3").verbose;
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
    salasDB.createTableSalas,
    funcionarioDB.createTableFuncionarios,
    cursoDB.creaTableCursos,
    keyStrangerDB.creaTable
]

function creaTableDb(db,index=0){
    if(index >= tableCreationSequence.length){
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