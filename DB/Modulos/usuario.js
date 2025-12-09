/*Frameworks*/
const sqlite3 = require("sqlite3"); 



//-- -----------------------------------------------------
//-- Table `mydb`.`Usuario`
//-- -----------------------------------------------------

/*
Criação da tabela
getUsuario - autenticação(Verificar a credibilidade do dado)
*/

//Autenticação
function getUser(db, email, callback){
    const sql = `SELECT * FROM usuario WHERE email = ?`
    db.get(sql, [email], callback);
}

function getUserCpf(db,cpf,callback){
    const sql = `SELECT * FROM usuario WHERE cpf = ?`
    db.get(sql,[cpf], callback);
}

//Criar Tabela
/*---Criar tabelas---*/
function creatTable(db, callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS Usuario (
            cpf TEXT PRIMARY KEY NOT NULL,
            email TEXT NOT NULL,
            nome TEXT,
            perfil TEXT
        );
    `;
    
    db.run(sql, (err)=>{
        db.get(`SELECT COUNT(*) AS total FROM Usuario`,(err,row) =>{
            if (err) return callback(err);
            if(row.total === 0){
                const dadosUser = `
                    INSERT INTO Usuario(cpf,nome,email,perfil)
                    VALUES
                        ('887.986.528-50', 'Guilherme Teodoro', 'guilherme.t.gomes7@aluno.senai.br', 'PROF'),
                        ('358.741.728-82', 'Giovana Lobo', 'giovana.l.santos6@aluno.senai.br', 'TEC'),
                        ('723.557.388-07', 'Murillo Alves', 'murillo.a.reis@aluno.senai.br', 'PROF'),
                        ('176.979.388-71', 'Gabriela Meri', 'gabriela.giacomini@aluno.senai.br', 'TEC');
                `;

                db.run(dadosUser,(err)=>{
                    if (err) return callback(err);
                    console.log("Usuarios iniciais criados.");
                    callback(null);
                })
            }
        })
    });
}

module.exports = {
    getUser,
    creatTable,
    getUserCpf
}
    

    
