import Header from "./components/header";
import Box from "@mui/material/Box";
import Footer from "./components/footer";
import Main from "./components/main";

function App() {
  return (
    <Box sx={{ display: "grid", minHeight: "100vh", placeItems: "center", width:'100%' }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          width: "90%",
          minHeight: "100%",
          paddingBlock:'10rem',
          flexWrap:"wrap",
          flexBasis:1,
          gap: "1rem",
          justifyContent:'center',
        }}
      >
        <Main />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
