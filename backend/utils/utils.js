// Creates the SQL statement for PATCH requests to /post depending on which fields are present
// Returns:
//   updateFields - an array of strings to be inserted in the SQL statement
//   values - an array of updated values
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

// Creates a unique timestamped filename for user uploads to S3
const generateUniqueFileName = (userId, fileName) => {
  return `users/${userId}/${Date.now()}-${fileName}`;
};

// Converts snake_case keys to camelCase (e.g. the Post object when it is retrieved from the database)
const camelizeKeys = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
      value,
    ])
  );
};

module.exports = {
  getUpdateFields,
  formatValidationErrors,
  generateUniqueFileName,
  camelizeKeys,
};
