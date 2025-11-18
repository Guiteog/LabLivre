/*Frameworks*/
const sqlite3 = require("sqlite3"); 

const table = "sala";

/* 
-- -----------------------------------------------------
-- Table `mydb`.`Salas`
-- -----------------------------------------------------
*/

function criarTable(db, callback){
    const sql = `
        CREATE TABLE IF NOT EXISTS mydb.Salas (
        idSalas INT NOT NULL,
        nomeSala VARCHAR(100) NOT NULL,
        status TINYINT NOT NULL,
        PRIMARY KEY (idSalas)
        ENGINE = InnoDB;

    `;

    db.run(sql, callback);
}