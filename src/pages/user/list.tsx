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
import React, { useEffect, useState } from 'react';
import { fetchData } from "../../services/firestoreService";
function truncateString(str, num) {
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
}

export const PostList: React.FC = () => {
  useDocumentTitle({ i18nKey: "WebAdmin" });
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchData('users').then((data: IUser[]) => {
      setUsers(data);
    });
  }, []);

  const columns = [
    { accessorKey: "id", header: "User_ID" },
    { accessorKey: "firstName", header: "Firstname" },
    { accessorKey: "lastName", header: "Lastname" },
    { accessorKey: "nickname", header: "Nickname" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "profileImageUrl", header: "Profile Image URL" },
    { accessorKey: "actions", header: "Actions" }
  ];
  const handleDelete = (id: string) => {
    setSelectedId(id);
    onOpen();
  };
  const confirmDelete = async () => {
    if (selectedId) {
      // โค้ดสำหรับลบผู้ใช้จากฐานข้อมูล
      console.log("Deleting:", selectedId);
      // อัปเดตสถานะผู้ใช้หลังจากลบ
      setUsers(users.filter(user => user.id !== selectedId));
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
        onClick={() => console.log("View:", id)}
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
                  return <Td key={column.accessorKey}>{user[column.accessorKey]}</Td>;
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
      Are you sure do you want to delete field this user?
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
