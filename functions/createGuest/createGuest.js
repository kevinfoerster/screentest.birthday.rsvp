const Airtable = require('airtable');
// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {

    const data = JSON.parse(event.body)
    const { name, partner, email, notes = '', sweet } = data
    const base = new Airtable({ apiKey: 'ENTER-API-KEY-HERE' }).base('appCJmiWX2GWEvcRJ');

    console.log(JSON.stringify(data, null, 2));

    if (!sweet) {
      base('guestlist').create({
        name, partner, email, notes
      }, function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record.getId());
      });
    }


    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'ok', context, event })
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
