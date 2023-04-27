const mysql = require("mysql2/promise");
const config = require("../config");
const HttpError = require("./http-error");

const query = async (sql, params) => {
	const connection = await mysql.createConnection(config.db);
	const [output,] = await connection.execute(sql, params, (err, results, fields) => {
		if (err) {
			const error = new HttpError("Executing SQL query failed", 500);
			return next(error);
		};
		return results;
	});

	return output;
};

exports.query = query;