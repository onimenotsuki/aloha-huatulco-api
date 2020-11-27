const { BAD_REQUEST, getStatusText, OK } = require('http-status-codes');

module.exports = async ({ mail }, res) => {
  try {
    const response = await mail.ping.get();

    return res.status(OK).json(response);
  } catch (error) {
    return res
      .status(BAD_REQUEST)
      .json({
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST),
        error: JSON.stringify(error),
      });
  }
};
