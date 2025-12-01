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
function getUser(db, email, calback){
    const sql = `SELECT FROM * usuario WHERE email = ?`
    db.get(sql, [email], calback);
}

//Criar Tabela
/*---Criar tabelas---*/
function creatTable(db, callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS Usuario (
            cpf INTEGER PRIMARY KEY NOT NULL,
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
                    INSERT INTO Usuario(cpf,email,nome,perfil)
                    VALUES
                        ('11122233344', 'João da Silva', 'gui.tgomez@gmail.com', 'Administrador', '1234'),
                        ('55566677788', 'Maria Oliveira', 'maria@lablivre.com', 'Professor', '5678'),
                        ('99900011122', 'Carlos Pereira', 'carlos@lablivre.com', 'Técnico', '9012'),
                        ('33344455566', 'Ana Souza', 'ana@lablivre.com', 'Professor', '3456');
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
    creatTable
}
    

    
