const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

exports.handler = async function (event, context) {
  try {
    // Parse the request body
    const { email, phone } = JSON.parse(event.body);

    console.log(email, phone);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required" }),
      };
    }

    const emailhash = md5(email);
    try {
      await mailchimp.lists.setListMember(
        process.env.MAILCHIMP_AUDIENCE_ID,
        emailhash,
        {
          email_address: email,
          status_if_new: "subscribed",
          status: "subscribed",
          merge_fields: {
            PHONE: phone,
          },
        }
      );

      return {
        statusCode: 201,
        body: JSON.stringify({ error: "" }),
      };
    } catch (error) {
      console.error("Mailchimp error: ", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message || error.toString() }),
      };
    }
  } catch (error) {
    console.error("General error: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
};
