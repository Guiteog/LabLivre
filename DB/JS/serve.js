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
const email_2FA = require('../Modulos/ModuloUsuario/2FA');

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
const usuarioDB = require('../Modulos/usuario');
const cursoDB = require('../Modulos/curso');
const reserva = require('../Modulos/reserva');
const emailService = require('../Modulos/ModuloUsuario/emailservice');
const authDB = require('../Modulos/ModuloUsuario/2FA');

const creaTabl = [
    salasDB.creatTable,
    usuarioDB.creatTable,
    cursoDB.creatTable,
    reserva.creatTable,
    emailService.creaTable
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
app.post('/login',(req, res => {
    const {email} = req.body;
    if(!email){
        return res.status(400).json({ status: null });
    }

    usuarioDB.getUser(db, email,(err, user) =>{
        if(err){
            return res.status(500).json({ status: err });
        }

        if(!user){
            return res.status(401).json({ status: null});
        }

        //=============2FA=============//
        const userCPF = user.CPF;

        //Código Token
        const token = Math.floor(100000 + Math.random() * 900000);

        //tempo
        const expiresToken = new Date(Date.now() + 5 * 60 * 1000).toISOString();

        emailService.setToken(db, userCPF, token, expiresToken, (err) => {
            if(err){
                return res.status(500).json({ status: err });
            }

            authDB.send2FACode(email, token);
            return res.status(200).json({ 
                status: "Token 2FA enviado com sucesso!",
                message: "Verifique seu e-mail e use o código para completar o login."
            });
        })
    })

}));

//======Minhas Reservas======//
app.get('/myReservas', (req, res =>{
    const {cpf} = req.query;

    if(!cpf){
        return res.status(400).json({ status: null });
    }
    reserva.myReserva(db, cpf, (err, rows) =>{
        if(err){
            return res.status(500).json({ 
                status: "Erro interno do servidor ao buscar reservas.",
                errorDetails: err.message
            });
        }

        //Caso não tenha nenhum dado
        if(!rows || rows.length === 0){
            return res.status(200).json({ 
                status: "Nenhuma reserva.",
                reservas: []
            });
        }

        //Dados da Reserva se tiver
        return res.status(200).json({ 
            status: "Reservas ativas",
            reservas: rows
        });
    })
}));

//======Todas as Reservas Actives=======//
app.get('/allReservasActvities', (req, res =>{
    reserva.activeReserva(db,(err, rows) => {
        if(err){
            return res.status(500).json({ 
                status: "Erro interno do servidor ao buscar reservas.",
                errorDetails: err.message
            });
        }

        //Caso não tenha nenhum dado
        if(!rows || rows.length === 0){
            return res.status(200).json({ 
                status: "Nenhuma reserva.",
                reservas: []
            });
        }

        //Dados da Reserva se tiver
        return res.status(200).json({ 
            status: "Reservas ativas",
            reservas: rows
        });
    })
}))