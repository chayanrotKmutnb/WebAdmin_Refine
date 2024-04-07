import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton, Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table, TableContainer, Tbody, Td, Th, Thead, Tr,
  useDisclosure
} from "@chakra-ui/react";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { useNavigate } from "react-router-dom"; 
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import db from "../../config/firebase-config";
import firebaseDataProvider from "../../services/firebaseDataProvider";
import { fetchData } from "../../services/firestoreService";
function truncateString(str: string, num: number) {
  if (!str) return "";
  return str.length > num ? str.slice(0, num) + '...' : str;
}



interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  profileImageUrl: string;
  gender: string;
  TripList: string;
  role: string;
}


export const PostList: React.FC = () => {
  useDocumentTitle({ i18nKey: "WebAdmin" });
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();
  async function fetchNonAdminUsers() {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("role", "!=", "Admin"));
    const querySnapshot = await getDocs(q);
    let users: IUser[] = [];
    querySnapshot.forEach((doc) => {
      const userData = { id: doc.id, ...doc.data() } as IUser; // เพิ่มการระบุชนิดของข้อมูล
      users.push(userData);
    });    
    return users;
  }
  useEffect(() => {
    fetchData('users').then((data: IUser[]) => {
        const nonAdminUsers = data.filter(user => user.role !== 'Admin');
        setUsers(nonAdminUsers); // ต้องตรงกับชนิดข้อมูลที่ fetch มา
    });
}, []);



  const columns = [
    { accessorKey: "id", header: "User_ID" },
    { accessorKey: "firstName", header: "Firstname" },
    { accessorKey: "lastName", header: "Lastname" },
    { accessorKey: "nickname", header: "Nickname" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "triplist", header: "triplist" },
    { accessorKey: "profileImageUrl", header: "Profile Image URL" },
    { accessorKey: "actions", header: "Actions" }
  ];

  const handleDelete = (id: string) => {
    setSelectedId(id);
    onOpen();
  };
  
  const confirmDelete = async () => {
    if (selectedId) {
      console.log("Deleting:", selectedId);
      
      // ลบข้อมูลผู้ใช้ใน Firestore
      await firebaseDataProvider.delete('users', { id: selectedId });
  
      // ลบบัญชีผู้ใช้ใน Firebase Authentication
      // สมมติว่า `/api/delete-user/` เป็น endpoint ใน backend ที่ลบบัญชีผู้ใช้
      await fetch(`/api/delete-user/${selectedId}`, { method: 'DELETE' });
  
      setUsers(users.filter(user => user.id !== selectedId)); // ลบข้อมูลผู้ใช้ที่มี ID เท่ากับ selectedId ออกจาก state
      onClose(); // ปิด Modal
    }
  };
  

  const renderActions = (id:string) => (
    <>
      <IconButton
        icon={<EditIcon />}
        _hover={{ backgroundColor: "#6FB197" }}
        size="sm"
        mr="2"
        onClick={() => console.log("Edit:", id)}
        aria-label="Edit"
      />
       <IconButton
        icon={<ViewIcon />}
        _hover={{ backgroundColor: "#436CF1" }}
        size="sm"
        mr="2"
        onClick={() => navigate(`/posts/show/${id}`)} // เปลี่ยนจาก navigation.show เป็น navigate ของ React Router
        aria-label="View"
      />
      <IconButton
      icon={<DeleteIcon />}
      _hover={{ backgroundColor: "#E53E3E" }}
      size="sm"
      onClick={() => handleDelete(id)}
      aria-label="Delete"
    />
  </>
);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = useState<string | null>(null);

 

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map(column => <Th key={column.accessorKey}>{column.header}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.id}>
              {columns.map(column => {
                if (column.accessorKey === 'profileImageUrl') {
                  const truncatedUrl = truncateString(user[column.accessorKey], 25);
                  return (
                    <Td key={column.accessorKey}>
                      <Link href={user[column.accessorKey]} isExternal>{truncatedUrl}</Link>
                    </Td>
                  );
                } else if (column.accessorKey === 'actions') {
                  return <Td key={column.accessorKey}>{renderActions(user.id)}</Td>;
                } else {
                  return <Td key={column.accessorKey}>{user[column.accessorKey as keyof IUser]}</Td>;
                }
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
  
      {/* ส่วนของ Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Confirm Delete</ModalHeader>
    <ModalBody>
      Are you sure do you want to delete this user?
    </ModalBody>
    <ModalFooter>
      <Button backgroundColor="#E53E3E" mr={3} onClick={confirmDelete} color="white">
      Delete
      </Button>
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </TableContainer>
  );
  
};
