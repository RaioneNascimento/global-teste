const db = require('../../config/database');
const md5 = require('md5');

module.exports = (app) => {

	app.get('/', (req, res) => {
		res.json({ message: 'Hello api!' });
	});

	app.get('/api/users/', (req, res) => {
		const sql = 'select * from users';
		db.all(sql, (err, rows) => {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: 'success',
				data: rows,
			});
		});
	});

	app.get('/api/users/:id', (req, res) => {
		const sql = 'select * from users where id = ?';
		const params = [req.params.id];
		db.all(sql, params, (err, row) => {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: 'success',
				data: row,
			});
		});
	});

	app.post('/api/users/', (req, res) => {
		var errors = [];
		if (!req.body.name) {
			errors.push('Nome não informado');
		}
		if (errors.length) {
			res.status(400).json({ error: errors.join(',') });
			return;
		}
		var user = {
			name: req.body.name,
			email: req.body.email ? req.body.email : '',
			password: req.body.password ? req.body.password : '',
			auth: req.body.auth ? req.body.auth : ''
		};

		var sql = `
			INSERT INTO users (
				name,
				email,
				password,
				auth
			) VALUES (?, ?, ?, ?)
    	`;
		var params = [
			user.name,
			user.email,
			user.md5(password),
			user.auth
		];

		db.run(sql, params, function (err, result) {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: 'success',
				data: user,
				id: this.lastID,
			});
		});
	});

	app.put('/api/users/:id', (req, res, next) => {
		var user = {
			name: req.body.name,
			email: req.body.email,
			auth: req.body.auth,
		};
		db.run(
			`UPDATE users set 
                name = COALESCE(?,name), 
                email = COALESCE(?,email),
                auth= COALESCE(?,auth)
            WHERE id = ?`,
			[
				user.name,
				user.email,
				user.auth,
				req.params.id,
			],
			function (err, result) {
				if (err) {
					console.log(err)
					res.status(400).json({ error: res.message });
					return;
				}
				res.json({
					message: 'success',
					data: user,
					changes: this.changes,
				});
			}
		);
	});

	app.delete('/api/users/:id', (req, res) => {
		db.run('DELETE FROM users WHERE id = ?', req.params.id, function (
			err,
			result
		) {
			if (err) {
				res.status(400).json({ error: res.message });
				return;
			}
			res.json({ message: 'deleted', changes: this.changes });
		});
	});

	app.post('/api/auth', (req, res) => {
		const sql = 'select * from users where email = ?';
		const params = [req.body.email];
		db.all(sql, params, (err, row) => {
			if (err) {
				res.status(500).json({ error: err.message });
				return;
			}
			if (!row || !row[0]) {
				res.status(404).json({ error: "User not found." });
				return;
			}
			if(row[0].password != md5(req.body.password)){
				res.status(400).json({ error: "Wrong login data." });
				return;
			}
			res.json({
				message: 'success',
				data: {
					email : row[0].email,
					name : row[0].name,
					auth : row[0].auth
				},
			});
		});
	});

	app.get((request, response) => {
		response.status(404);
	});
};
