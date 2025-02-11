import { jwtDecode } from "jwt-decode";

export default function getDecodedToken(){
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.log("No token found!");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token!", error);
    return null;
  }
};


