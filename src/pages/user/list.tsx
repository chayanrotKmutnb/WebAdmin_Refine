import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { IconButton, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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
    { accessorKey: "id", header: "UID" },
    { accessorKey: "firstName", header: "Firstname" },
    { accessorKey: "lastName", header: "Lastname" },
    { accessorKey: "nickname", header: "Nickname" },
    { accessorKey: "profileImageUrl", header: "Profile Image URL" },
    { accessorKey: "actions", header: "Actions" }
  ];

  const renderActions = (id) => (
    <>
      <IconButton
        icon={<EditIcon />}
        // colorScheme="blue"
        size="sm"
        mr="2"
        onClick={() => console.log("Edit:", id)}
        aria-label="Edit"
      />
      <IconButton
        icon={<ViewIcon />}
        // colorScheme="green"
        size="sm"
        mr="2"
        onClick={() => console.log("View:", id)}
        aria-label="View"
      />
      <IconButton
        icon={<DeleteIcon />}
        colorScheme="red"
        size="sm"
        onClick={() => console.log("Delete:", id)}
        aria-label="Delete"
      />
    </>
  );

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
    </TableContainer>
  );
};
