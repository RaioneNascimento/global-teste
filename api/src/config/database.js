const md5 = require('md5');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USERS_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
		auth TEXT NOT NULL
)
`;

const DROP_USERS_SCHEMA = `
	DROP TABLE IF EXISTS users;
`;

const INSERT_USER = `
    INSERT OR IGNORE INTO users (
        name,
        email,
        password,
				auth
    ) VALUES (?, ?, ?, ?)
`;

db.serialize(async () => {
	db.run('PRAGMA foreign_keys=ON');
	db.run(DROP_USERS_SCHEMA);
	db.run(USERS_SCHEMA);
	db.run(INSERT_USER, ['Admin', 'usarioadm@teste.com.br', md5('admin'), 'adm']);
	db.run(INSERT_USER, [	'User', 'usuariocomum@teste.com.br', md5('user'), 'user']);

	db.each('SELECT * FROM users', (err, contact) => {
		console.log(`Users: ${JSON.stringify(contact)}`);
	});
});

process.on('SIGINT', () =>
	db.close(() => {
		console.log('DB closed');
		process.exit(0);
	})
);

module.exports = db;
