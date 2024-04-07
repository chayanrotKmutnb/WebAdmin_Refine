import { MarkdownField, Show } from "@refinedev/chakra-ui";
import { useOne, useShow } from "@refinedev/core";

import { Heading, Spacer, Text } from "@chakra-ui/react";

import { ICategory, IPost } from "../../interfaces";

export const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData } = useOne<ICategory>({
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record?.category.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        UserID
      </Heading>
      <Text mt={2}>{record?.id}</Text>

      <Heading as="h5" size="sm" mt={4}>
        FirstName
      </Heading>
      <Text mt={2}>{record?.title}</Text>

      <Heading as="h5" size="sm" mt={4}>
        LastName
      </Heading>
      <Text mt={2}>{record?.status}</Text>

      <Heading as="h5" size="sm" mt={4}>
        NickName
      </Heading>
      <Text mt={2}>{record?.status}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Gender
      </Heading>
      <Text mt={2}>{categoryData?.data?.title}</Text>

      <Heading as="h5" size="sm" mt={4}>
        ContactNumber
      </Heading>
      <Text mt={2}>{categoryData?.data?.title}</Text>

      <Heading as="h5" size="sm" mt={4}>
      FriendList
      </Heading>
      <Spacer mt={2} />
      <MarkdownField value={record?.content} />

      <Heading as="h5" size="sm" mt={4}>
        ProfileImageUrl
      </Heading>
      <Text mt={2}>{categoryData?.data?.title}</Text>
      
    </Show>
  );
};
