import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key,
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email
  }),
  databaseURL: 'https://diary-app-api.firebaseio.com'
});

const db = admin.firestore();
export { db };
