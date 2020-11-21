import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// const addSeries = functions.https.onRequest((request, response) => {
//   const { name, description, notes, privacy, userID } = request.body;

//   try {
//     const series = db.collection('series').doc().create({
//       name, description: description || '', notes: notes || [], privacy, userID
//     })
//     response.status(200).send(series);
//   } catch(error) { response.status(500).json(error.message) }
// });
