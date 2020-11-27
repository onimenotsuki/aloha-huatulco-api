const { BAD_REQUEST, getStatusText, CREATED } = require('http-status-codes');
const md5 = require('md5');

module.exports = async ({ mail, params: { listId }, query, body }, res) => {
  const { operation = 'create' } = query;
  const { email, fields, interests, status, location, tags } = body;

  if (operation === 'create') {
    try {
      const result = await mail.lists.addListMember(listId, {
        status,
        location,
        tags,
        email_address: email,
        merge_fields: fields,
      });

      return res.status(CREATED).json(result);
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST),
        error: JSON.stringify(error),
      });
    }
  }

  if (operation === 'update-or-create') {
    try {
      const subscriberHash = md5(email.toLowerCase());

      const result = await mail.lists.setListMember(listId, subscriberHash, {
        status,
        status_if_new: status,
        location,
        email_address: email,
        merge_fields: fields,
      });

      return res.status(CREATED).json(result);
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST),
        error: JSON.stringify(error),
      });
    }
  }

  return res.status(BAD_REQUEST).json({
    status: BAD_REQUEST,
    statusText: getStatusText(BAD_REQUEST),
    error: 'Es necesario elegir un tipo de operación',
  });
};
