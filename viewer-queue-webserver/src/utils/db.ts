import dotenv from "dotenv";
dotenv.config();
import {
  initializeApp,
  applicationDefault,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";

const serviceAccount: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY
    ? process.env.PRIVATE_KEY.replace(/\\n/gm, "\n")
    : undefined,
  clientEmail: process.env.CLIENT_EMAIL,
};

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();

// const docRef = db.collection("ViewerQueue").doc("usernameArray");

// const document = await docRef.get();
// console.log(document?.data()?.usernameArray);
