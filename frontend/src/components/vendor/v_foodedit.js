
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

export default function V_foodedit() {
    if (localStorage.getItem("id") === null || localStorage.getItem("choice") != "Vendor" || localStorage.getItem("food_id")===null) {
        window.location.href = "/signin";
      }
      const [to_change, setChange] = useState("");
      const [new_value, setNewValue] = useState("");
      const [new_addon_prices, setPrices] = useState("");
      const setChangefunc = (event) => {
        setChange(event.target.value);
      };
      const setNewValuefunc = (event) => {
        setNewValue((event.target.value));
      };
      const setpricesfunc = (event) => {
        setPrices(String(event.target.value));
      };
      const ChangeDetail = (event) => {
        const NewDetail = {
          detail: to_change,
          value: new_value,
          id: localStorage.getItem("food_id"),
          new_addon_prices: new_addon_prices.split(',')
        };
    
        axios
          .post("api/vender/EditFood", NewDetail)
          .then((response) => {
            if (response.status === 404) {
              alert(response.data);
            }
            else {
              console.log(NewDetail);
              alert(response.data);
              localStorage.removeItem("food_id");
              window.location.href = "/v_home";
            }
          });
        
      };
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
            <Button color="inherit" onClick={() => window.location.href = "/v_statistics"}>
              My Statistics
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/register"}>
              Register
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/v_profile"}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/v_home"}>
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container align={"center"} spacing={2}><Grid item xs={12}>
    <FormControl sx={{ m: 5, minWidth: 100 }} align="center">
      <InputLabel id="demo-simple-select-label"></InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={to_change}
        label="Change Value"
        onChange={setChangefunc}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="vegornonveg">Veg/Non veg</MenuItem>
        <MenuItem value="tags">Tags</MenuItem>
        <MenuItem value="addon">Addons</MenuItem>
      </Select>
    </FormControl>
    </Grid>
      {to_change === "addon" ? (<>
        <Grid item xs={12}>
            <TextField
              label="ADDON NAME eg: (x,y,z)"
              variant="outlined"
              value={new_value}
              onChange={setNewValuefunc}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="ADDON PRICE eg: (2,3,4)"
              variant="outlined"
              value={new_addon_prices}
              onChange={setpricesfunc}
            />
          </Grid>
      </>) : (
        <>
          {to_change === "vegornonveg" ? (<>
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
          <MenuItem value="Veg">Veg</MenuItem>
          <MenuItem value="Non-Veg">Non-Veg</MenuItem>
        </Select>
      </FormControl></Grid>
          </>) : (<>
            <Grid item xs={12}>
            <TextField
              label="New value"
              variant="outlined"
              value={new_value}
              onChange={setNewValuefunc}
            />
          </Grid>
          </>)}
         
        </>
      )}
      < Grid item xs={12}>
        <Button variant="contained" value="change" onClick={ChangeDetail}>Change</Button>
      </Grid></Grid>
      </>
    );
  }