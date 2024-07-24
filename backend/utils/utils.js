// Returns:
// updatedFields - an array of the fields to be updated to be inserted into the SQL statement
// values - the ipdated values associated with those fields
const getUpdateFields = (body) => {
  const fields = [
    { name: 'title', field: 'title = ?' },
    { name: 'location', field: 'location = ?' },
    { name: 'body', field: 'body = ?' },
    { name: 'eventStart', field: 'event_start = ?' },
    { name: 'eventEnd', field: 'event_end = ?' },
  ];

  const updateFields = [];
  const values = [];

  for (const { name, field } of fields) {
    if (body[name]) {
      updateFields.push(field);
      values.push(body[name]);
    }
  }

  return { updateFields, values };
};

const formatValidationErrors = (errors) => {
  const formatedErrors = errors.reduce((acc, error) => {
    acc[error.path[0]] = error.message;
    return acc;
  }, {});

  return formatedErrors;
};

module.exports = { getUpdateFields, formatValidationErrors };
