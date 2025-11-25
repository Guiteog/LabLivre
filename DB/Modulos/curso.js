/*Frameworks*/
const sqlite3 = require("sqlite3"); 

const table = "curso";

/* 
-- -----------------------------------------------------
-- Table `mydb`.`curso`
-- -----------------------------------------------------
*/


/*---Criar tabelas---*/
function creatTable(db, callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS curso (
            id_curso INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_curso TEXT UNIQUE NOT NULL,
            periodo TEXT,
            descricao TEXT
        );
    `;
    
    db.run(sql, callback);
}

/* =======Listar os curso======== */

function listarCurso(){
    const sql = `
        SELECT id_curso, nome_curso FROM curso ORDER BY NAME
    `
    db.all(sql, [], callback)
}

module.exports(
    creatTable,
    listarCurso
)