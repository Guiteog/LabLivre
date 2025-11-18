/*Frameworks*/
const sqlite3 = require("sqlite3"); 

const table = "curso";

/* 
-- -----------------------------------------------------
-- Table `mydb`.`Salas`
-- -----------------------------------------------------
*/


/*---Criar tabelas---*/
function criarSala(db, callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
            id_curso INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_curso TEXT UNIQUE NOT NULL,
            periodo TEXT,
            descricao TEXT
        );
    `;
    // db.run é usado para operações que não retornam dados
    db.run(sql, callback);
}



module.exports(
    criarSala,
    listarSala,
    insertSala
)