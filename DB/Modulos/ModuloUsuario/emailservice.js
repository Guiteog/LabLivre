/*Frameworks*/
const sqlite3 = require("sqlite3"); 

/*======Criar tabelas======*/
function creatTable(db, callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS emailToken (
            cpfUser TEXT PRIMARY KEY,
            token INTEGER NOT NULL,
            expiresToken TEXT NOT NULL, 
            FOREIGN KEY(cpfUser) REFERENCES Usuario(cpf) ON DELETE CASCADE
        );
    `;
    
    db.run(sql, callback);
}

//======Remover o token======//
function removeToken(db, cpf, callback){
    const sql = `
        DELETE FROM emailToken WHERE cpfUser = ?
    `

    db.run(sql,[cpf], callback)
}

//======Setar Dados======//
function setToken(db, cpf, token, expiresToken, callback){
    const sql = `
        REPLACE INTO emailToken (cpfUser, token, expiresToken)
        VALUES (?,?,?)
    `;

    db.run(sql, [cpf, token, expiresToken], callback) 
}

//======autenticação======//
function verifyToken(db, cpf,token, callback){
    const now = new Date().toISOString();
    
    const sql = `
        SELECT * FROM emailToken
        WHERE cpfUser = ?
        AND token = ?
        AND expiresToken > ?
    `

    db.get(sql,[cpf,token,now],callback);
}

module.exports ={
    creatTable,
    removeToken,
    setToken,
    verifyToken
}
    
