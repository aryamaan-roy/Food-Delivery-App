
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';



const theme = createTheme();

export default function B_wallet() {
  
  const [add_wallet, setwallet] = useState("");
  const [old_wallet, setOldWallet] = useState("");
  if (localStorage.getItem("id") == null || localStorage.getItem("choice") !== "Buyer") {
    window.location.href = "/signin";
  }

  const setAddWallet = (event) => {
    setwallet(event.target.value);
  };
  const Buyer = {
    id: localStorage.getItem("id")
  };
  axios.post("api/user/details", Buyer)
  .then((response) => {
    if(response.status === 200)
    {
      setOldWallet(response.data.wallet);
    }
  });
  const ChangeWallet = (event) => {
    
    const NewDetail = {
      detail: "wallet",
      value: Number(Number(old_wallet)+Number(add_wallet)),
      id: localStorage.getItem("id"),
    };

    axios
      .post("api/user/change", NewDetail)
      .then((response) => {
        if (response.status === 200) {
          console.log(NewDetail);
          window.location.href = "/b_wallet";
        }
        else {
          alert(response.data);
        }
      });
    
  };

  return (<>
   <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => window.location.href = "/"}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => window.location.href = "/b_home"}>
              Home
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/register"}>
              Register
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/b_profile"}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/signin"}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
   <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Wallet
          </Typography>
          <h2 align="center">Current amount: {old_wallet}</h2>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Enter Value"
              name="name"
              autoComplete="name"
              autoFocus
              value={add_wallet}
              onChange={setAddWallet}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={ChangeWallet}
            >
              Add amount
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider></>
  );
}