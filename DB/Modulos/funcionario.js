/*Frameworks*/
const sqlite3 = require("sqlite3"); 

const table = "Funcionario";

/* 
-- -----------------------------------------------------
-- Table `mydb`.`Funcionario`
-- -----------------------------------------------------
*/

/*---Criar tabelas---*/
function criarFuncionario(db, callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS ${table} (
            cpf INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT UNIQUE NOT NULL,
            email TEXT,
            codigo INTEGER,
            perfil TEXT
        );
    `;
    
    db.run(sql, callback);
}

function listarFuncionario(){
    const sql = `
        SELECT email, codigo ${table} ORDER BY NAME
    `
    db.all(sql, [], callback)
}


module.exports(
    criarFuncionario,
    listarFuncionario
)
    
