/*Frameworks*/
const sqlite3 = require("sqlite3"); 

const table = "Sala";

/* 
-- -----------------------------------------------------
-- Table `mydb`.`Salas`
-- -----------------------------------------------------
*/


/*---Criar tabelas---*/
function criarTable(db, callback){
    const sql = `
        CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
            id_sala INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_sala TEXT UNIQUE NOT NULL
        );
    `;

    db.run(sql, callback);
}


/* =======Listar as salas======== */

function listarSala(){
    const sql = `
        SELECT id_sala, nome_sala FROM ${table} ORDER BY NAME
    `
    db.all(sql, [], callback)
}

module.exports(
    criarTable,
    listarSala
)