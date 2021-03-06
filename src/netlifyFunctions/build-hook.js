const fetch = require("node-fetch");

const API_ENDPOINT = process.env.NETLIFY_BUILD_HOOKS_URL;

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { method: 'POST' })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: "Buld hook worked.",
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};