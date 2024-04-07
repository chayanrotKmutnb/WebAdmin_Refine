import { getAuth, deleteUser } from 'firebase/auth';

export const deleteUserAccount = async (): Promise<void> => {
  const auth = getAuth();
  if (auth.currentUser) {
    try {
      await deleteUser(auth.currentUser);
      console.log('ลบบัญชีผู้ใช้เรียบร้อยแล้ว');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบบัญชีผู้ใช้:', error);
      throw new Error('ไม่สามารถลบบัญชีผู้ใช้ได้');
    }
  }
};
