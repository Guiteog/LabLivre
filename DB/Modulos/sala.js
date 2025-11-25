/*Frameworks*/
const sqlite3 = require("sqlite3"); 

/* 
-- -----------------------------------------------------
-- Table `mydb`.`Salas`
-- -----------------------------------------------------
*/


/*---Criar tabelas---*/
function creatTable(db, callback){
    const sql = `
        CREATE TABLE IF NOT EXISTS Sala (
            id_sala INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_sala TEXT UNIQUE NOT NULL
        );
    `;

    db.run(sql, callback);
}


/* =======Listar as salas======== */

function listarSala(){
    const sql = `
        SELECT id_sala, nome_sala FROM Sala ORDER BY NAME
    `
    db.all(sql, [], callback)
}

module.exports(
    creatTable,
    listarSala
)