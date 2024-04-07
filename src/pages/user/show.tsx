import { Box, Heading, Text, Spacer } from "@chakra-ui/react";
import { MarkdownField, Show } from "@refinedev/chakra-ui";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchData } from "../../services/firestoreService";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  gender: string;
  contactNumber: string;
  friendList: string;
  profileImageUrl: string;
}

export const PostShow: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchData().then(data => {
        const user = data.find(u => u.id === userId) as IUser;
        setUserData(user);
        setIsLoading(false);
      }).catch(error => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
    }
  }, [userId]);

  return (
    <Show isLoading={isLoading}>
      {userData && (
        <>
          <Heading as="h5" size="sm">UserID</Heading>
          <Text mt={2}>{userData.id}</Text>

          <Heading as="h5" size="sm" mt={4}>FirstName</Heading>
          <Text mt={2}>{userData.firstName}</Text>

          <Heading as="h5" size="sm" mt={4}>LastName</Heading>
          <Text mt={2}>{userData.lastName}</Text>

          <Heading as="h5" size="sm" mt={4}>NickName</Heading>
          <Text mt={2}>{userData.nickname}</Text>

          <Heading as="h5" size="sm" mt={4}>Gender</Heading>
          <Text mt={2}>{userData.gender}</Text>

          <Heading as="h5" size="sm" mt={4}>ContactNumber</Heading>
          <Text mt={2}>{userData.contactNumber}</Text>

          <Heading as="h5" size="sm" mt={4}>FriendList</Heading>
          <Spacer mt={2} />
          <MarkdownField value={userData.friendList} />

          <Heading as="h5" size="sm" mt={4}>ProfileImageUrl</Heading>
          <Text mt={2}>{userData.profileImageUrl}</Text>
        </>
      )}
    </Show>
  );
};
