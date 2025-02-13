import { Button } from "@mui/material";
import { useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display:'flex',textAlign: "center", padding: "50px", flexDirection:'column', gap:'20px', justifyContent:'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button variant="contained" sx={{width:'60%', marginX:'auto'} }onClick={()=>{navigate('/')}}>Go to Home Page</Button>
    </div>
  );
};

export default NotFound;
