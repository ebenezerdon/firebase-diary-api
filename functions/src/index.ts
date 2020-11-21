import * as functions from 'firebase-functions';
import { db } from './config/firebase';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

const addEntry = functions.https.onRequest((request, response) => {
  const { title, text, coverImageUrl } = request.body;

  try {
    const entry = db.collection('entry').doc().create({
      title, text, coverImageUrl: coverImageUrl || []
    })
    response.status(200).send(entry);
  } catch(error) { response.status(500).json(error.message) }
});

export { helloWorld, addEntry }
