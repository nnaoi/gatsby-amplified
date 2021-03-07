require('dotenv').config();
const fetch = require("node-fetch").default;

const API_ENDPOINT = process.env.NETLIFY_BUILD_HOOKS_URL;

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { 
    method: 'POST',
  })
    .then(() => ({
      statusCode: 200,
      body: "Buld hook worked.",
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};