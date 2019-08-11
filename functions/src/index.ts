import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();

export const archiveChat = functions.firestore
    .document("chats/{chatId}")
    .onUpdate(change => {
        const data = change.after.data();
        if (data == undefined) {
            return null;
        }
        const maxLen = 100;
        const msgLen = data.messages.length;
        const charLen = JSON.stringify(data).length;

        const batch = db.batch();

        if(charLen >= 10000 || msgLen >= maxLen) {
            // Always delete at least 1 message
            const deleteCount = msgLen - maxLen <= 0 ? 1 : msgLen - maxLen
            data.messages.splice(0, deleteCount);
        
            const ref = db.collection("chats").doc(change.after.id);

            batch.set(ref, data, { merge: true });

            return batch.commit();
        } else {
            return null;
        }
    });


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
