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


//=======Modulos=========
const email_2FA = require('../Modulos/2FA');

const db = new sqlite3.Database("../labLivreDb.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) =>{
    if(err){
        process.exit(1);
    } else{
        dbConnected = true;
        creaTableDb(db);
    }
});

//Modulos
const salasDB = require('../Modulos/sala');
const funcionarioDB = require('../Modulos/funcionario');
const cursoDB = require('../Modulos/curso');
const reserva = require('../Modulos/reserva');

const creaTabl = [
    salasDB.creatTableSalas,
    funcionarioDB.creatTableFuncionarios,
    cursoDB.creaTableCursos,
    reserva.creaTable
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




/*=========Primeira Parte Login==========*/


app.post('/login', (req, res) => {
    const {email} = req.body;
    funcionarioDB.getFuncionarioByEmail(db, email, (err, funcionario) =>{
        if(!funcionario){
            return res.status(401).json({ error: "Email incorretos." });
        }

        email_2FA.send2FACode(funcionario.email, code2FA)
    })
})