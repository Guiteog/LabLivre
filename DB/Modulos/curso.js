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
            idCurso INTEGER PRIMARY KEY AUTOINCREMENT,
            nomeCurso TEXT UNIQUE NOT NULL
        );
    `;
    
    db.run(sql, (err)=>{
        db.get(`SELECT COUNT(*) AS total FROM Curso`,(err,row) =>{
            if (err) return callback(err);
            if(row.total === 0){
                const dadosCursos = `
                    INSERT INTO Curso(nomeCurso)
                    VALUES
                        ('Mecânico de Manutenção de Máquinas Industriais'),
                        ('Eletricista Industrial'),
                        ('Técnico em Desenvolvimento de Sistemas'),
                        ('Operador de Processos Químicos'),
                        ('Soldador'),
                        ('Padeiro e Confeiteiro'),
                        ('Design Gráfico'),
                        ('Análise e Desenvolvimento de Sistemas'),
                        ('NR 10 - Segurança em Instalações e Serviços com Eletricidade'),
                        ('Torneiro Mecânico');
                `;

                db.run(dadosCursos,(err)=>{
                    if (err) return callback(err);
                    console.log("cursos inicias criados");
                    callback(null);
                })
            }
        })
    });
}

/* =======Listar os curso======== */

function listarCurso(){
    const sql = `
        SELECT id_curso, nome_curso FROM curso ORDER BY NAME
    `

    
    db.all(sql, [], callback)
}

module.exports = {
    creatTable,
    listarCurso
}
    
