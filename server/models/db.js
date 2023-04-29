const db = require("../config");
const HttpError = require("./http-error");

const query = async (sql, params) => {

	try {
		const promisePool = await db.promise();
		const [output,] = await promisePool.execute(sql, params, (err, results, fields) => {
			if (err) {
				const error = new HttpError("Executing SQL query failed", 500);
				return next(error);
			};
			console.log(results);
			return results;
		});
		return output;
	} catch (err) {
		console.log(err);
	}
};

exports.query = query;