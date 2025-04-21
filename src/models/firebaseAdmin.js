const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(require("./web-thi-trac-nghiem-firebase-adminsdk-fbsvc-e56e880724.json")),
});

module.exports = admin;