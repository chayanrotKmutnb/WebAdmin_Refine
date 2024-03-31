// import { useEffect, useState } from 'react';
// import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';

// const Post = () => {
//   const [users, setUsers] = useState([]);
//   const db = getFirestore();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const usersCol = collection(db, 'users');
//       const q = query(usersCol, where('contactNumber', '!=', ''), where('firstName', '!=', ''));
//       const querySnapshot = await getDocs(q);
//       const usersList = querySnapshot.docs.map(doc => doc.data());
//       setUsers(usersList);
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       {users.map(user => (
//         <div key={user.contactNumber}>
//           <p>{`Name: ${user.firstName} ${user.lastName}`}</p>
//           <p>{`Contact: ${user.contactNumber}`}</p>
//           <p>{`Nickname: ${user.nickName}`}</p>
//           <p>{`Gender: ${user.gender}`}</p>
//           {/* Display other fields as needed */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Post;
