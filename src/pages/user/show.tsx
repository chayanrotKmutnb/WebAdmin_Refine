import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Show } from "@refinedev/chakra-ui";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  triplist: string;
}

export const PostShow: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/posts/edit/${userId}`);
  };

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
        <>
          <Box mb={4}>
            {" "}
            <Heading as="h5" size="sm" mt={4}>
              ProfileImage
            </Heading>
            {userData.profileImageUrl ? (
              <Image
                mt={2}
                src={userData.profileImageUrl}
                alt="Profile Image"
                boxSize="200px" // หรือขนาดที่คุณต้องการ
                objectFit="cover"
              />
            ) : (
              <Text mt={2}>ไม่มีรูปภาพ</Text>
            )}
          </Box>

          <Heading as="h5" size="sm">
            UserID
          </Heading>
          <Text mt={2}>{userData.id}</Text>

          <Heading as="h5" size="sm" mt={4}>
            FirstName
          </Heading>
          <Text mt={2}>{userData.firstName}</Text>

          <Heading as="h5" size="sm" mt={4}>
            LastName
          </Heading>
          <Text mt={2}>{userData.lastName}</Text>

          <Heading as="h5" size="sm" mt={4}>
            NickName
          </Heading>
          <Text mt={2}>{userData.nickname}</Text>

          <Heading as="h5" size="sm" mt={4}>
            Gender
          </Heading>
          <Text mt={2}>{userData.gender}</Text>

          <Heading as="h5" size="sm" mt={4}>
            ContactNumber
          </Heading>
          <Text mt={2}>{userData.contactNumber}</Text>

          <Heading as="h5" size="sm" mt={4}>
            FriendList
          </Heading>
          <Text mt={2}>
            {userData.friendList
              ? typeof userData.friendList === "string"
                ? userData.friendList.split(", ").join(", ")
                : "ไม่มีรายชื่อเพื่อน"
              : "ไม่มีรายชื่อเพื่อน"}
          </Text>

          <Heading as="h5" size="sm" mt={4}>
            TripList
          </Heading>
          <Text mt={2}>{userData.triplist}</Text>
        </>
      )}
    </Show>
  );
};
