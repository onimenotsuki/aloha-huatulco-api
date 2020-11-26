const { BAD_REQUEST, getStatusText } = require('http-status-codes');

module.exports = async ({ calendar, query }, res) => {
  const {
    calendarId = '9t9mv0lcct9l71hfcsr8oo7be0@group.calendar.google.com',
  } = query;

  try {
    const result = await calendar.events.list({
      calendarId,
      alwaysIncludeEmail: true,
    });

    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      statusText: getStatusText(BAD_REQUEST),
      message: JSON.stringify(error),
    });
  }
};
