const { Webhook } = require('svix');
const Users = require('../models/Users');

const createUser = async (event) => {
  const {
    id: clerkId,
    username,
    email_addresses: emailAddresses,
    first_name: firstName,
    last_name: lastName,
    image_url: imageUrl,
  } = event.data;
  const { email_address: email } = emailAddresses[0];
  await Users.createUser(
    clerkId,
    username,
    email,
    firstName,
    lastName,
    imageUrl
  );
};

const updateUser = async (event) => {
  const {
    id: clerkId,
    username,
    email_addresses: emailAddresses,
    first_name: firstName,
    last_name: lastName,
    image_url: imageUrl,
  } = event.data;
  const { email_address: email } = emailAddresses[0];
  await Users.updateUser(
    clerkId,
    username,
    email,
    firstName,
    lastName,
    imageUrl
  );
};

const deleteUser = async (event) => {
  const { id: clerkId } = event.data;
  await Users.deleteUser(clerkId);
};

const receiveWebhook = async (req, res, next) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('You need a WEBHOOK_SECRET in your .env');
  }

  // Get the headers and body
  const headers = req.headers;
  const payload = JSON.stringify(req.body);

  // Get the Svix headers for verification
  const svix_id = headers['svix-id'];
  const svix_timestamp = headers['svix-timestamp'];
  const svix_signature = headers['svix-signature'];

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error('Error occured -- no svix headers');
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let event;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and  return error code
  try {
    event = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    next(err);
  }

  switch (event.type) {
    case 'user.created': {
      try {
        await createUser(event);
      } catch (err) {
        next(err);
      }
      break;
    }
    case 'user.updated': {
      try {
        await updateUser(event);
      } catch (err) {
        next(err);
      }
      break;
    }
    case 'user.deleted': {
      try {
        await deleteUser(event);
      } catch (err) {
        next(err);
      }
      break;
    }
    default: {
      throw new Error('No handler defined for event of type: ' + event.type);
    }
  }

  return res.status(200).json({
    status: 'success',
    message: 'Webhook received',
  });
};

module.exports = { receiveWebhook };
