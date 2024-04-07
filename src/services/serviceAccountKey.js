var admin = require("firebase-admin");

var serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://triptour-63a6f-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const deleteFirebaseUser = async (uid) => {
  try {
    await admin.auth().deleteUser(uid);
    console.log('ลบบัญชีผู้ใช้เรียบร้อยแล้ว:', uid);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลบบัญชีผู้ใช้:', error);
  }
};

module.exports = { deleteFirebaseUser };
