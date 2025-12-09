/*Frameworks*/
const sqlite3 = require("sqlite3"); 



//-- -----------------------------------------------------
//-- Table `mydb`.`Curso_&_Professor`
//-- -----------------------------------------------------

/*
filtro
criação de tabela
*/

/*======Criar tabelas======*/
function creatTable(db, callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS Curso_&_Professor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nomeCurso TEXT NOT NULL,
            cpf_Professor TEXT,
            FOREIGN KEY(nomeCurso) REFERENCES Curso(nomeCurso),
            FOREIGN KEY(cpf_Professor) REFERENCES Usuario(cpf) 
        );
    `;
    
    db.run(sql, (err)=>{
        db.get(`SELECT COUNT(*) AS total FROM Curso_&_Professor`,(err,row) =>{
            if (err) return callback(err);
            if(row.total === 0){
                const dadosCursos = `
                    INSERT INTO Curso(nomeCurso,cpf_Professor)
                    VALUES
                        ('Mecânico de Manutenção de Máquinas Industriais', '887.986.528-50'), 
                        ('Eletricista Industrial', '887.986.528-50'), 
                        ('Técnico em Desenvolvimento de Sistemas', '723.557.388-07'), 
                        ('Análise e Desenvolvimento de Sistemas', '723.557.388-07'), 
                        ('Análise e Desenvolvimento de Sistemas', '887.986.528-50'), 
                        ('Operador de Processos Químicos', '723.557.388-07'), 
                        ('Soldador', '887.986.528-50'), 
                        ('Design Gráfico', '723.557.388-07'), 
                        ('NR 10 - Segurança em Instalações e Serviços com Eletric...', '723.557.388-07'), 
                        ('Torneiro Mecânico', '887.986.528-50') 
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