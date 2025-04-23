const parseCSVStream = require('./utils/csvParser');
const { saveUsersToDB, getAgeDistribution } = require('./users.service');
const { CSV_FILE_PATH } = require('../../config');

async function uploadCSV(req, res, next) {
  try {
    await parseCSVStream(CSV_FILE_PATH, async (chunk) => {
      await saveUsersToDB(chunk, 'admin');
    }, Number(process.env.CHUNK_SIZE));

    const distribution = await getAgeDistribution();
    res.status(200).json({ message: 'Users uploaded and processed', distribution });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadCSV };
