// ./firebase.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    readFileSync(path.resolve('./firebaseServiceKey.json'))
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
