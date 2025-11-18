/*Frameworks*/
const sqlite3 = require("sqlite3"); 

const table = "sala";

/* 
-- -----------------------------------------------------
-- Table `mydb`.`Salas`
-- -----------------------------------------------------
*/


/*---Criar tabelas---*/
function criarTable(db, callback){
    const sql = `
        CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
            idSalas INTEGER PRIMARY KEY AUTOINCREMENT,
            nomeSala TEXT UNIQUE NOT NULL,
            status INTEGER NOT NULL
        );
    `;

    db.run(sql, callback);
}

/*---Listar Salas---*/
function listarSala(db, callback) {
    const sql = `SELECT * FROM ${TABLE_NAME} ORDER BY nomeSala`;
    db.all(sql, callback);
}

function insertSala(db, salaData, callback) {
    // Usando os novos nomes de campo
    const { nomeSala, status } = salaData; 
    const sql = `
        INSERT INTO ${TABLE_NAME} (nomeSala, status)
        VALUES (?, ?)
    `;
    db.run(sql, [nomeSala, status], callback);
}

module.exports(
    criarTable,
    listarSala,
    insertSala
)