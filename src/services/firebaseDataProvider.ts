import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "../config/firebase-config";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  // คุณสามารถเพิ่มคุณสมบัติอื่นๆ ตามต้องการ
}

interface IResourceData {
  id?: string;
  [key: string]: any;
}

const firebaseDataProvider = {
  getList: async (resource: string, params: any) => {
    const querySnapshot = await getDocs(collection(db, resource));
    return {
      data: querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      total: querySnapshot.size,
    };
  },

  getOne: async (resource: string, params: { id: string }) => {
    const docRef = doc(db, resource, params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: { ...docSnap.data(), id: docSnap.id } };
    } else {
      throw new Error("Document not found");
    }
  },

  create: async (resource: string, params: { data: IResourceData }) => {
    const docRef = await addDoc(collection(db, resource), params.data);
    return { data: { ...params.data, id: docRef.id } };
  },

  update: async (
    resource: string,
    params: { id: string; data: IResourceData }
  ) => {
    const docRef = doc(db, resource, params.id);
    await updateDoc(docRef, params.data);
    return { data: { ...params.data, id: params.id } };
  },

  delete: async (resource: string, params: { id: string }) => {
    const docRef = doc(db, resource, params.id);
    await deleteDoc(docRef);
    return { data: { id: params.id } };
  },
};

export default firebaseDataProvider;
// ใน firebaseDataProvider.ts
// export interface IUser {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   // คุณสามารถเพิ่มคุณสมบัติอื่นๆ ตามต้องการ
// }

// คุณสามารถ export interface อื่นๆ ถ้าจำเป็น
