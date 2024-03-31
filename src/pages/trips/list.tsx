// import {
//   Table,
//   TableContainer,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
// } from "@chakra-ui/react";
// import { useDocumentTitle } from "@refinedev/react-router-v6";
// import React, { useEffect, useState } from 'react';
// import { fetchData } from "../../services/firestoreService";

// interface IUser {
//   id: string;
//   firstName: string; // หรือ `firstName?: string;` ถ้า field นี้ไม่จำเป็นต้องมี
//   // คุณอาจจะเพิ่ม field อื่นๆ ที่คุณต้องการใช้
// }

// export const TripsList: React.FC = () => {
//   useDocumentTitle({ i18nKey: "WebAdmin" });
//   const [users, setUsers] = useState<IUser[]>([]);

//   useEffect(() => {
//     fetchData('users').then((data: IUser[]) => {
//       setUsers(data); // ตั้งค่าข้อมูลผู้ใช้ลงใน state
//     });
//   }, []);

//   // ระบุ column และข้อมูลที่คุณต้องการแสดง
//   const columns = React.useMemo<ColumnDef<IUser>[]>(() => [
//     {
//       accessorKey: "firstName", // ตรงกับ key ในข้อมูล
//       header: () => "firstname",
//       cell: info => <Td>{info.row.original.firstName}</Td>
//     },
//     {
//       accessorKey: "lastname", // ตรงกับ key ในข้อมูล
//       header: () => "lastname",
//       cell: info => <Td>{info.row.original.lastName}</Td>
//     },
//     {
//       accessorKey: "nickname", // ตรงกับ key ในข้อมูล
//       header: () => "nickname",
//       cell: info => <Td>{info.row.original.nickname}</Td>
//     },
   
//     // คอลัมน์อื่นๆ ...
//   ], []);

//   return (
//     <TableContainer>
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             {columns.map((column) => (
//               <Th key={column.accessorKey}>{column.header()}</Th>
//             ))}
//           </Tr>
//         </Thead>
//         <Tbody>
//           {users.map((user) => (
//             <Tr key={user.id}>
//               {columns.map((column) => {
//                 const Cell = column.cell;
//                 return <Cell key={column.accessorKey} row={{ original: user }} />;
//               })}
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </TableContainer>
//   );
// };