/*Frameworks*/
const sqlite3 = require("sqlite3"); 



//-- -----------------------------------------------------
//-- Table `mydb`.`Usuario`
//-- -----------------------------------------------------

/*
Criação da tabela
getUsuario - autenticação(Verificar a credibilidade do dado)
*/

//Autenticação
function getUser(db, email, calback){
    const sql = `SELECT FROM * usuario WHERE email = ?`
    db.get(sql, [email], calback);
}

//Criar Tabela
/*---Criar tabelas---*/
function creatTable(db, callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS Usuario (
            cpf INTEGER PRIMARY KEY NOT NULL,
            email TEXT NOT NULL,
            nome TEXT,
            perfil TEXT
        );
    `;
    
    db.run(sql, callback);
}

module.exports(
    getUser,
    creatTable
)
    
