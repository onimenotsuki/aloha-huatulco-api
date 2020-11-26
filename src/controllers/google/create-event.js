const { BAD_REQUEST, getStatusText } = require('http-status-codes');

module.exports = async ({ calendar, body }, res) => {
  const {
    location,
    start,
    end,
    summary,
    attendees,
    calendarId = '9t9mv0lcct9l71hfcsr8oo7be0@group.calendar.google.com',
  } = body;

  try {
    const newEvent = await calendar.events.insert({
      calendarId,
      requestBody: {
        location,
        start,
        end,
        summary,
        attendees,
      },
    });

    return res.status(201).json(newEvent.data);
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      statusText: getStatusText(BAD_REQUEST),
      message: JSON.stringify(error),
    });
  }
};
