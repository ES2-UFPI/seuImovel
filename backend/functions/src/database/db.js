const admin = require('firebase-admin')

const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const database = admin.firestore()

module.exports = database