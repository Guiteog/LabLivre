//Requirimentos 
const express = require("express");
const sqlite = require("sqlite3").verbose;
const app = express();

// Flag para controlar o estado do banco
let dbConnected = false;

//Dados do Servidor
const porta = 3030;
app.use(express.json());

//Conexão Do Banco
const db = new sqlite3.Database("..\DB\LabLivre.db", (err) => {
    
    //Erro na conexão do DB
    if(err){
        //Mensagem no console
        console.error("❌ ERRO FATAL: Falha ao conectar ao banco de dados:", err.message);

        //Impedir o carregamento
        process.exit(1);
    } 
    else{

        //Flag sinalizando conexão
        dbConnected = true;

        db.run(
            `CREATE TABLE IF NOT EXISTS Funcionario (
            CPF TEXT PRIMARY KEY,
            email TEXT NOT NULL,
            nome TEXT NOT NULL,
            perfil TEXT NOT NULL
            )`,(err) => {
                
                if(err){
                    console.error("❌ ERRO FATAL: Falha ao criar a tabela Funcionario:", err.message);
                    process.exit(1);
                }

                app.listen(port, () => {
                    console.log(`Servidor rodando em http://localhost:${port}`);
                });
        });
    }
});