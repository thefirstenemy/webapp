"use strict";
const sqlite3 = require('sqlite3').verbose()

class Db {
	constructor(file){
		this.db = new sqlite3.Database(file);
		this.createTable()
	}

	createTable(){
		const sql = `
			CREATE TABLE IF NOT EXISTS user(
				id INT AUTO_INCREMENT PRIMARY KEY,
				name VARCHAR(30) NOT NULL,
				email VARCHAR(50) NOT NULL,
				user_pass VARCHAR(100) NOT NULL
				)
		`
		return this.db.run(sql)
	}

	selectByEmail(email, callback) {
		return this.db.get(
			`SELECT * FROM user WHERE email = ?`,
			[email], function (err, row) {
				callback(err, row)
			})
	}

	selectAll(callback) {
		return this.db.all(`SELECT * FROM user`, function (err, rows) {
			callback(err, rows)
		})
	}

	insert(user, callback) {
		return this.db.run(
			'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
			user, (err) => {
				callback(err)
			})
	}
}

module.exports = Db



