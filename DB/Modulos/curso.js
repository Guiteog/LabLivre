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
        CREATE TABLE IF NOT EXISTS Curso (
            idCurso TEXT PRIMARY KEY AUTOINCREMENT,
            nomeCurso TEXT UNIQUE NOT NULL
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