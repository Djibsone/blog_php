import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'djibril',
    password: 'tamou',
    database: 'gestock'
});
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion a la base de donnees:', err);
        return;
    }

    console.log('Connecter a la base de donnees!');
});
export const db = connection;
