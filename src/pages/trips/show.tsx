import {
  Box,
  Center,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { Show } from '@refinedev/chakra-ui';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../services/firestoreService';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  gender: string;
  contactNumber: string;
  friendList: string;
  profileImageUrl: string;
  triplist: string;
}

export const TripShow: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchData()
        .then((data) => {
          const user = data.find((u) => u.id === userId) as IUser;
          setUserData(user);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        });
    }
  }, [userId]);

  return (
    <Show isLoading={isLoading}>
      {userData && (
        <VStack spacing={4} align="stretch">
          <Center>
            <Image
              boxSize="250px"
              borderRadius="full"
              src={userData.profileImageUrl}
              alt="Profile Image"
            />
          </Center>
          <Center>
            <Heading as="h3" size="lg">{userData.nickname}</Heading>
          </Center>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">UserID</Td>
                  <Td>{userData.id}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">FirstName</Td>
                  <Td>{userData.firstName}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">LastName</Td>
                  <Td>{userData.lastName}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">ContactNumber</Td>
                  <Td>{userData.contactNumber}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">TripList</Td>
                  <Td>{userData.triplist || '0'}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">FriendList</Td>
                  <Td>{userData.friendList || '0'}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      )}
    </Show>
  );
};
