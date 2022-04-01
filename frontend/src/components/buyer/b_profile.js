
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

export default function B_profile() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [to_change, setChange] = useState("");
  const [new_value, setNewValue] = useState("");

  if (localStorage.getItem("id") == null || localStorage.getItem("choice") !== "Buyer") {
    window.location.href = "/signin";
  }
  const Buyer = {
    id: localStorage.getItem("id")
  };

  const setChangefunc = (event) => {
    setChange(event.target.value);
  };
  const setNewValuefunc = (event) => {
    setNewValue((event.target.value));
  };
  const ChangeDetail = (event) => {
    const NewDetail = {
      detail: to_change,
      value: new_value,
      id: localStorage.getItem("id"),
    };

    axios
      .post("api/user/change", NewDetail)
      .then((response) => {
        if (response.status === 200) {
          console.log(NewDetail);
          window.location.href = "/b_profile";

        }
        else {
          alert(response.data);
        }
      });

  };
  axios
    .post("api/user/details", Buyer)
    .then((response) => {
      console.log(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setContact(response.data.contact);
      setAge(response.data.age);
      setBatch(response.data.batch);
    });

  function createData(Detail, Value) {
    return { Detail, Value };
  }

  const rows = [
    createData('Name', name),
    createData('Email', email),
    createData('Contact', contact),
    createData('Batch', batch),
    createData('Age', age)
  ];


  return (<>
    <Box sx={{ flexGrow: 1 }}>
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
          <Button color="inherit" onClick={() => window.location.href = "/b_wallet"}>
              Wallet
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/b_myorders"}>
              My orders
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/b_home"}>
              Home
            </Button>
          <Button color="inherit" onClick={() => window.location.href = "/register"}>
            Register
          </Button>
          <Button color="inherit" onClick={() => window.location.href = "/b_profile"}>
            My Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Detail</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.Detail}</TableCell>
              <TableCell align="left">{row.Value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <h2 align="center">Change details:</h2>
    <Grid container align={"center"} spacing={2}>
      <FormControl sx={{ m: 5, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={to_change}
          label="Change Value"
          onChange={setChangefunc}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="contact">Contact</MenuItem>
          <MenuItem value="age">Age</MenuItem>
          <MenuItem value="batch">Batch</MenuItem>
        </Select>
      </FormControl>

      {to_change === "batch" ? (<>
        <Grid item xs={12}>
          <FormControl sx={{ m: 5, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={new_value}
              label="Change Value"
              onChange={setNewValuefunc}
            >
              <MenuItem value="UG1">UG1</MenuItem>
              <MenuItem value="UG2">UG2</MenuItem>
              <MenuItem value="UG3">UG3</MenuItem>
              <MenuItem value="UG4">UG4</MenuItem>
            </Select>
          </FormControl></Grid>
      </>) : (
        <>
          <Grid item xs={12}>
            <TextField
              label="New value"
              variant="outlined"
              value={new_value}
              onChange={setNewValuefunc}
            />
          </Grid>
        </>
      )}
      < Grid item xs={12}>
        <Button variant="contained" value="change" onClick={ChangeDetail}>Change</Button>
      </Grid></Grid></>
  );
}