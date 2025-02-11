
import { Box, Container, Typography, Link, Divider } from "@mui/material";

export default function Footer() {
  return (
    <>
<Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[200],
        textAlign: "center",
        width:'100%'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          |
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
          |
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Contact Us
          </Link>
        </Typography>
      </Container>
    </Box>
    </>
  )
}
