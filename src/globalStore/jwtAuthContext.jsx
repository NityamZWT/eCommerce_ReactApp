// import { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const JwtAuthContext = createContext();

// export default function JwtAuthProvider({ children }) {
//   const [token, setToken] = useState(() => localStorage.getItem("jwtToken"));
//   const [userRole, setUserRole] = useState(null);
//   const [userName, setUserName] = useState(null);

//   console.log('outside', token);
//   useEffect(() => {
//     if (token) {
//         console.log('inside',token);
//       try {
//         const decodedUser = jwtDecode(token);
//         console.log('decode--',decodedUser);
        
//         setUserRole(decodedUser.role);
//         setUserName(decodedUser.name);
//         localStorage.setItem("jwtToken", token);
//       } catch (error) {
//         console.error("Invalid token:", error);
//         logout();
//       }
//     }
//   }, [token]);

//   const login = (newToken) => {
//     console.log('insid login function');
//     ()=>{} setToken(newToken);
//     console.log('token---',token);
    
//   };

//   const logout = () => {
//     setToken(null);
//     setUserRole(null);
//     setUserName(null);
//     localStorage.removeItem("jwtToken");
//   };

//   return (
//     <JwtAuthContext.Provider value={{ token, userRole, userName, login, logout }}>
//       {children}
//     </JwtAuthContext.Provider>
//   );
// }
