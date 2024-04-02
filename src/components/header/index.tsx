// // ไม่มีส่วนตรงกันอย่างชัดเจนใน Chakra UI สำหรับ icons จึงข้ามการนำเข้า DarkModeOutlined และ LightModeOutlined
// import { AppBar, Avatar, IconButton, Stack, Toolbar, Typography } from '@chakra-ui/react';
// import { useGetIdentity } from "@refinedev/core";
// import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui"; // ตรวจสอบว่ามีการใช้งานเหล่านี้ใน Chakra UI หรือไม่
// import React, { useContext } from "react";
// import { ColorModeContext } from "../../contexts/color-mode";

// // โครงสร้างของ IUser ยังคงเดิม
// type IUser = {
//   id: number;
//   name: string;
//   avatar: string;
// };

// export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
//   sticky = true,
// }) => {
//   const { mode, setMode } = useContext(ColorModeContext);

//   const { data: user } = useGetIdentity<IUser>();

//   // ใช้คอมโพเนนต์จาก Chakra UI ในการสร้าง UI
//   return (
//     <AppBar position={sticky ? "sticky" : "relative"}>
//       <Toolbar>
//         <Stack
//           direction="row"
//           width="100%"
//           justifyContent="flex-end"
//           alignItems="center"
//         >
//           <HamburgerMenu />
//           <Stack
//             direction="row"
//             width="100%"
//             justifyContent="flex-end"
//             alignItems="center"
//           >
//             <IconButton
//               color="inherit"
//               onClick={() => {
//                 setMode();
//               }}
//             >
//               {/* ต้องหาวิธีแสดง icon ใน Chakra UI */}
//             </IconButton>

//             {(user?.avatar || user?.name) && (
//               <Stack
//                 direction="row"
//                 gap="16px"
//                 alignItems="center"
//                 justifyContent="center"
//               >
//                 {user?.name && (
//                   <Typography
//                     sx={{
//                       display: {
//                         xs: "none",
//                         sm: "inline-block",
//                       },
//                     }}
//                     variant="subtitle2"
//                   >
//                     {user?.name}
//                   </Typography>
//                 )}
//                 <Avatar src={user?.avatar} alt={user?.name} />
//               </Stack>
//             )}
//           </Stack>
//         </Stack>
//       </Toolbar>
//     </AppBar>
//   );
// };
