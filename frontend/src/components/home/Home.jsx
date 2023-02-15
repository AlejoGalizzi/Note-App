import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";


const Home = () => {
  return (
    <Container justifyContent="center" alignItems="center">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" >
          <Toolbar>
            <Typography variant="h2" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: ['Tahoma', 'Sans-Serif']}}>
              Home
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid
            container
            rowSpacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} justifyContent="center" alignItems="center">
            <Link to="/activeNotes" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  width: "100%",
                  maxWidth: "100%",
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    // opacity: [0.9, 0.8, 0.7],
                  },

                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                
                  <Typography variant="h4" sx={{fontFamily: ['Tahoma', 'Sans-Serif'], color: 'white'}}>Active Notes</Typography>
              </Box>
              </Link>
            </Grid>
            <Grid item xs={6} justifyContent="center" alignItems="center">
            <Link to="/archiveNotes" style={{ textDecoration: "none" }}>
              <Box sx={{
                  flexGrow: 1,
                  display: "flex",
                  width: "100%",
                  maxWidth: "100%",
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    // opacity: [0.9, 0.8, 0.7],
                  },
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                }}>
                  <Typography variant="h4" sx={{fontFamily: ['Tahoma', 'Sans-Serif'], color: 'white'}}>Archive Notes</Typography>
              </Box>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default Home;
