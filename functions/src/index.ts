// import * as admin from 'firebase-admin';
// // ส่วนนี้คือการ initialize Firebase Admin SDK
// admin.initializeApp();

// // ตัวอย่างโค้ดสำหรับการลบ UID ใน Firebase Authentication
// async function deleteFirebaseAuthUser(uid: string) {
//     try {
//         await admin.auth().deleteUser(uid);
//         console.log('Successfully deleted user:', uid);
//     } catch (error) {
//         console.error('Error deleting user:', error);
//     }
// }

// // ใช้งานฟังก์ชัน deleteFirebaseAuthUser โดยส่ง UID ที่ต้องการลบเป็น parameter
// deleteFirebaseAuthUser('user_uid_to_delete');
