const { BAD_REQUEST, getStatusText, OK } = require('http-status-codes');

module.exports = async ({ mail, params: { listId } }, res) => {
  try {
    const result = await mail.lists.getListMembersInfo(listId);

    return res.status(OK).json(result);
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      statusText: getStatusText(BAD_REQUEST),
      error: JSON.stringify(error),
    });
  }
};
