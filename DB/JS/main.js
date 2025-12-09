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
        console.error("❌ ERRO GRAVE: Falha ao conectar/abrir o DB.", err.message);
    } else{
        console.log("✅ Conectado ao banco de dados. Iniciando criação de tabelas...");
        dbConnected = true;
        app.listen(porta, () => {
            console.log(`✅ Servidor Express rodando. URL: http://localhost:${porta}`);
        });
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
    emailService.creatTable
]
//==========================
//Rapaziada, se der qualquer
//erro, é só olhar o console
//Acho que coloquei todos os 
//erros.
//==========================

//Não mexe no DB pelo amor de Deus, ele está do jeito certo
function creaTableDb(db,index=0){
    
    if(index >= creaTabl.length){
        console.log(`✅ Todas as tabelas criadas. Servidor iniciado na porta ${porta}.`);
        return
    }

    const creatFunction = creaTabl[index];

    creatFunction(db, (err) => {
        if(err){
            console.error(`❌ ERRO na criação de tabela${index}, ${err.message}`);

        }
        creaTableDb(db, index + 1);
    });  
}


/*=========Primeira Parte Login==========*/
app.post('/login',(req, res) => {
    const {email} = req.body;
    if(!email){
        console.error("❌ ERRO dados null: Email não fornecido no corpo da requisição.");
        return res.status(400).json({ status: null });
    }

    usuarioDB.getUser(db, email,(err, user) =>{
        if(err){
            console.error("❌ ERRO SQL NA BUSCA DE USUÁRIO:", err.message);
            return res.status(500).json({ status: err });
        }

        if(!user){
            console.error("⚠️ Usuário não encontrado no banco para o email:", email);
            return res.status(401).json({ status: false});
        }

        //=============2FA=============//
        const userCPF = user.cpf;

        //Código Token
        const token = Math.floor(100000 + Math.random() * 900000);

        //tempo
        const expiresToken = new Date(Date.now() + 5 * 60 * 1000).toISOString();

        emailService.setToken(db, userCPF, token, expiresToken, (err) => {
            if(err){
                console.error("❌ Erro ao enviar o email:", err.message);
                return res.status(500).json({ status: err });
            }

            authDB.send2FACode(email, token);
            console.log("✅ Mensagem enviada");
            return res.status(200).json({ 
                status: true,
                message: "Verifique seu e-mail e use o código para completar o login.",
                dadosUser:{
                    cpf: user.cpf
                }
            });
        })
    })

});


//======Segunda Parte da verificação======//
app.post('/verificaToken', (req, res) =>{
    const {token, cpf} = req.body;
    if(!token || !cpf){
        console.error("❌ ERRO dados null: Email não fornecido no corpo da requisição.");
        return res.status(400).json({ status: null });
    }

    emailService.verifyToken(db, cpf, token,(err, user) =>{
        if(err){
            console.error("❌ Erro ao verificar o token:", err.message);
            return res.status(500).json({ status: "erro", message: "Erro interno do servidor na validação." });
        }

        if(!user){
            console.error("errado");
            return res.status(401).json({ status: false, message: "Código de verificação inválido ou expirado." });
        }

        usuarioDB.getUserCpf(db,cpf,(err,user)=>{
            if(err || !user){
                return res.status(500).json({ status: "erro", message: "Erro ao verificar os dados." })
            }

            return res.status(200).json({
                status:true,
                dadosUser:{
                    cpf: user.cpf,
                    nome:user.nome,
                    email:user.email,
                    perfil:user.perfil
                }
            })
        })
    })
});


//======Minhas Reservas======//
app.get('/myReservas', (req, res) =>{
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
});

//======Todas as Reservas Actives=======//
app.get('/allReservasActvities', (req, res) =>{
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
})