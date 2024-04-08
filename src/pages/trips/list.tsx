import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Link as ChakraLink } from "@chakra-ui/react";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import React, { useEffect, useState } from 'react';
import { fetchData } from "../../services/firestoreService";

function truncateString(str, num) {
  if (!str) return "";
  return str.length > num ? str.slice(0, num) + '...' : str;
}

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

export const TripList: React.FC = () => {
  useDocumentTitle({ i18nKey: "Trips" });
  const [trips, setTrips] = useState<ITrip[]>([]);

  useEffect(() => {
    fetchData('trips').then((data: ITrip[]) => {
      setTrips(data);
    });
  }, []);

  const columns = [
    { accessorKey: "tripName", header: "Trip Name" },
    { accessorKey: "tripStartDate", header: "Start Date" },
    { accessorKey: "tripEndDate", header: "End Date" },
    { accessorKey: "tripLimit", header: "Limit" },
    { accessorKey: "tripStatus", header: "Status" },
    { accessorKey: "tripProfileUrl", header: "Profile Image URL" },
    { accessorKey: "actions", header: "Actions" }
  ];

  const renderActions = (trip: ITrip) => (
    <>
      <ChakraLink href={`/trips/show/${trip.id}`}><Button colorScheme="blue" size="sm" mr="2">Show</Button></ChakraLink>
      <Button colorScheme="red" size="sm" onClick={() => console.log("Delete:", trip.id)}>Delete</Button>
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
          {trips.map(trip => (
            <Tr key={trip.id}>
              {columns.map(column => {
                if (column.accessorKey === 'tripProfileUrl') {
                  const truncatedUrl = truncateString(trip[column.accessorKey], 25);
                  return (
                    <Td key={column.accessorKey}>
                      <ChakraLink href={trip[column.accessorKey]} isExternal>{truncatedUrl}</ChakraLink>
                    </Td>
                  );
                } else if (column.accessorKey === 'actions') {
                  return <Td key={column.accessorKey}>{renderActions(trip)}</Td>;
                } else {
                  return <Td key={column.accessorKey}>{trip[column.accessorKey]}</Td>;
                }
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
