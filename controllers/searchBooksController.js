const pg = require('../db/pg');
const { sort } = require('../utilities/sort');

exports.getSearchBooks = async (req, res, next) => {
  try {
    const userId = req.user.sub;

    const sortBy = sort(req.query.sortBy);

    const { rows } = await pg.query(`SELECT * FROM BOOKS WHERE USER_ID = $1 AND lower(TITLE) LIKE lower('%${req.query.query}%') ORDER BY ${sortBy}`, [userId]);

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
