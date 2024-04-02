import { Show, useShow } from "@refinedev/core";
import { Heading, Text } from "@chakra-ui/react";

interface ITrip {
  id: string;
  tripName: string;
  tripStartDate: string;
  tripEndDate: string;
  tripLimit: string;
  tripStatus: string;
  tripProfileUrl: string;
  userId: string;
}

export const TripShow: React.FC = () => {
  const { queryResult } = useShow<ITrip>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">Trip Name</Heading>
      <Text mt={2}>{record?.tripName}</Text>

      <Heading as="h5" size="sm" mt={4}>Start Date</Heading>
      <Text mt={2}>{record?.tripStartDate}</Text>

      <Heading as="h5" size="sm" mt={4}>End Date</Heading>
      <Text mt={2}>{record?.tripEndDate}</Text>

      <Heading as="h5" size="sm" mt={4}>Limit</Heading>
      <Text mt={2}>{record?.tripLimit}</Text>

      <Heading as="h5" size="sm" mt={4}>Status</Heading>
      <Text mt={2}>{record?.tripStatus}</Text>

      <Heading as="h5" size="sm" mt={4}>Profile URL</Heading>
      <Text mt={2}>{record?.tripProfileUrl}</Text>

      <Heading as="h5" size="sm" mt={4}>User ID</Heading>
      <Text mt={2}>{record?.userId}</Text>
    </Show>
  );
};
