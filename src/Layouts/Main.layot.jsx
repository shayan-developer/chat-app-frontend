import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
const MainLayout = ({ children }) => {
  return (
    <Container maxWidth={'lg'}>
      <Box
        component={"div"}
        sx={(t)=>({
          height: "100vh",
          ...t.centerCol,
          width: 1,
          py:8,
          "@media (max-width:900px)": {
            py:4,
          },
        })}
      >
        {children}
      </Box>
    </Container>
  );
};

export default MainLayout;
