/*Frameworks*/
const sqlite3 = require("sqlite3"); 



/* 
-- -----------------------------------------------------
-- Table `mydb`.`Reserva`
-- -----------------------------------------------------
*/

//======Criação da tabela======//
function creatTable(db, callback) {
    const sql = `
        CREATE TABLE IF NOT EXISTS Reserva (
            idReserva INTEGER PRIMARY KEY AUTOINCREMENT,
            idSala INTEGER NOT NULL,
            idCPF TEXT NOT NULL,
            idCurso TEXT NOT NULL,
            titulo TEXT NOT NULL,
            dia TEXT NOT NULL,
            turnoStart TEXT NOT NULL,
            turnoEnd TEXT NOT NULL,
            dataFimCompleta TEXT NOT NULL,
            FOREIGN KEY(idSala) REFERENCES Sala(idSala),
            FOREIGN KEY(idCPF) REFERENCES Usuario(cpf),
            FOREIGN KEY(idCurso) REFERENCES curso(idCurso)
        );
    `;
    
    db.run(sql, callback);
}

//======Inserção de Dados======//
function insertReserva(db, reservaDados, callback){
    const {idSala, idCPF,idCurso, titulo, dia, turnoStart, turnoEnd} = reservaDados;
    const dataFimCompleta = `${dia}T${turnoEnd}:00Z`; 
    
    const sql = `
        INSERT INTO Reserva (idSala, idCPF,idCurso, titulo, dia, turnoStart, turnoEnd, dataFimCompleta)
        VALUES(?,?,?,?,?,?,?)
    `

    db.run(sql,[idSala, idCPF,idCurso, titulo, dia, turnoStart, turnoEnd], callback);
}

//======Reservas Gerais All=====//
function getAll(db, callback){
    const sql = `
        SELECT * FROM Reserva
        ORDER BY dia ASC
    `
    db.all(sql, callback);
}


//======Reservas Gerais Ativas======//
function activeReserva(db, callback) {
    const now = new Date().toISOString();
    const sql = `
        SELECT * FROM Reserva
        WHERE dataFimCompleta > ?
        ORDER BY dataInicio ASC
    `;
    db.all(sql, [now], callback);
}

//======Reservas Pessoais Ativas======//
function myReserva(db, idCPF, callback) {
    const now = new Date().toISOString();
    const sql = `
        SELECT * FROM Reserva
        WHERE idCPF = ? AND dataFimCompleta > ?
        ORDER BY dataInicio ASC
    `;
    db.all(sql, [idCPF, now], callback);
}


//======Verificar Reserva======//
function filterReserva(db, idSala, dia, turnoStart, turnoEnd, callback){
    const sql = `
        SELECT idReserva
        FROM Reserva
        WHERE idSala = ?
        AND dia = ?
        AND (
            turnoStart < ? AND turnoEnd > ? 
        )
        LIMIT 1
    `

    db.get(sql, [
        idSala,
        dia,
        turnoEnd,
        turnoStart
    ], callback);
}


module.exports = {
    creatTable,
    insertReserva,
    getAll,
    activeReserva,
    myReserva,
    filterReserva
};