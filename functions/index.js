/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// to use the firebase functions payment is mandatory
// predeployment with tslint generates errors
// the only payment can be done using webhooks

const functions = require("firebase-functions");
const admin = require("firebase-admin");


admin.initializeApp(functions.config().firebase);

const stripe = require("stripe")(functions.config().stripe.secret);

exports.stripeCharge = functions.database
    .ref("/payments/{userId}/{paymendId}")
    .onWrite((event) => {
      const payment = event.data.val();
      const userId = event.params.userId;
      const paymendId = event.params.paymendId;

      // check if payment exists or if it has already been charged
      if (!payment || payment.charge) return;

      return admin
          .database()
          .ref(`/users/${userId}`)
          .once("value")
          .then((snapshot) => {
            return snapshot.val();
          })
          .then((customer) => {
            const amount = payment;
            // eslint-disable-next-line camelcase, no-undef
            const idempotency_key = paymentId;
            const source = payment.token.id;
            const currency = "usd";
            const charge = {amount, currency, source};

            // eslint-disable-next-line camelcase
            return stripe.charges.create(charge, {idempotency_key});
          })

          .then((charge) => {
            admin
                .database()
                .ref(`/payments/${userId}/${paymendId}/charge`)
                .set(charge);
          });
    });


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
