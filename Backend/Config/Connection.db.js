const {initializeApp,applicationDefault,cert} = require('firebase-admin/app')
const {getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const serviceAccount = require('./firebase.json')

initializeApp({
    credential: cert(serviceAccount)
});


const db = getFirestore(); // call for create firebase connection

module.exports = db;