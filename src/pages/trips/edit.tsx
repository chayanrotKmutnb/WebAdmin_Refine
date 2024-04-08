// PostEdit.tsx
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore'; // เพิ่ม import updateDoc ด้วย
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../services/firestoreService';

interface IUser {
  firstName: string;
  lastName: string;
  nickname: string;
  gender: string;
  contactNumber: string;
}

export const TripEdit = () => {
  const { firstName } = useParams<{ firstName?: string }>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IUser>();

  useEffect(() => {
    const fetchData = async () => {
      if (firstName) {
        const docRef = doc(db, "users", firstName);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data() as IUser;

        setValue('firstName', userData.firstName); // ตั้งค่าค่าเริ่มต้นสำหรับฟิลด์ "ชื่อจริง"
      }
    };

    fetchData();
  }, [firstName, setValue]);

  const onSubmit = async (data: IUser) => {
    if (firstName) {
      // ส่งข้อมูลผู้ใช้ที่เปลี่ยนแปลงไปยังฟังก์ชัน updateUser เพื่ออัปเดตข้อมูลใน Firestore
      await updateUser(firstName, data)
        .then(() => {
          console.log("User data updated successfully");
        })
        .catch((error) => {
          console.error("Error updating user data", error);
        });
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.firstName}>
        <FormLabel htmlFor="firstName">ชื่อจริง</FormLabel>
        <Input id="firstName" type="text" {...register("firstName")} />
        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">
        อัปเดต
      </Button>
    </form>
  );
};
