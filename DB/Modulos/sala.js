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
            idSala INTEGER PRIMARY KEY AUTOINCREMENT,
            nomeSala TEXT UNIQUE NOT NULL
        );
    `;

    db.run(sql, (err)=>{
        db.get(`SELECT COUNT(*) AS total FROM Sala`,(err,row) =>{
            if (err) return callback(err);
            if(row.total === 0){
                const dadosSala = `
                    INSERT INTO Sala(nomeSala)
                    VALUES
                        ('Laboratório de Eletroeletrônica'),
                        ('Laboratório de Informática 1'),
                        ('Sala de Reunião de Projetos'),
                        ('Oficina'),
                        ('Teatro'),
                        ('Sala de Treinamento NR'),
                        ('Sala 401');
                `;

                db.run(dadosSala,(err)=>{
                    if (err) return callback(err);
                    console.log("Salas inicias criadas");
                    callback(null);
                })
            }
        })
    });
}


/* =======Listar as salas======== */

function listarSala(db,callback){
    const sql = `
        SELECT idSala, nomeSala FROM Sala ORDER BY nomeSala
    `
    db.all(sql, [], callback)
}

module.exports = {
    creatTable,
    listarSala
}
    
