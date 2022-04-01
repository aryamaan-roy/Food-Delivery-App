import * as React from 'react';
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Add_food() {
    if (localStorage.getItem("id") === null || localStorage.getItem("choice") != "Vendor") {
        window.location.href = "/signin";
        console.log("invalid mc");
    }
    const [name, setName] = useState("");
    const [date, setDate] = useState(null);
    const [price, setPrice] = useState("");
    const [vegornonveg, setVeg] = useState("");
    const [alltags, setAlltags] = useState("");
    const [alladdonprice, setAlladdonprice] = useState("");
    const [alladdonname, setAlladdonname] = useState("");
    const [vendor_name, setVendorName] = useState("");
    const [vendor_shop, setVendorshop] = useState("");

    const resetInputs = () => {
        setName("");
        setDate(null);
        setPrice("");
        setVeg("");
        setAlltags("");
        setAlladdonname("");
        setAlladdonprice("");
        setVendorName("");
        setVendorshop("");
    };

    const onChangeaddonprice = (event) => {
      setAlladdonprice(event.target.value);
    }
    const onChangeaddonname = (event) => {
      setAlladdonname(event.target.value);
    }
    const onChangeTags = (event) => {
      setAlltags(event.target.value);
    }
    const onChangename = (event) => {
        setName(event.target.value);
      };

      const onChangeprice = (event) => {
        setPrice(event.target.value);
      };

      const setVegfunc = (event) => {
        setVeg(event.target.value);
      };
    
    
      const InsertFood = (event) => {
        event.preventDefault();
        
        const Vendor = {
          id: localStorage.getItem("id")
        };

        axios
        .post("api/vender/details", Vendor)
        .then((response) => {
          if(response.status === 200){
            setVendorName(response.data.name);
            setVendorshop(response.data.shop);
          }
          else
          {
            alert(response.data);
          }   
        });

        const newItem = {
          vendor_id:localStorage.getItem("id"),
          vendor_name : vendor_name,
          name: name,
          date: Date.now(),
          total: 0,
          rate: 0,
          vegornonveg: vegornonveg,
          price: price,
          tags: alltags.split(','),
          addon_name: alladdonname.split(','),
          addon_price: alladdonprice.split(','),
          vendor_shop: vendor_shop
        };
        axios
          .post("api/vender/addFood", newItem)
          .then((response) => {
            if(response.status===400)
            {
              alert(response.data);
            }
            else{
              alert("Created\t" + response.data.name);
              console.log(response.data);
            }
            
          });
    
        resetInputs();
      };


    return (
  <>
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
          <Button color="inherit" onClick={() => window.location.href = "/register"}>
            Register
          </Button>
          <Button color="inherit" onClick={() => window.location.href = "/v_profile"}>
            My Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box><br></br><br></br>
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={onChangename}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        value={price}
                        onChange={onChangeprice}
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={vegornonveg}
          label="Change Value"
          onChange={setVegfunc}
        >
          <MenuItem value="Veg">Veg</MenuItem>
          <MenuItem value="Non-Veg">Non-Veg</MenuItem>
        </Select>
      </FormControl><br></br><br></br>
      <Grid item xs={20}>
                    <TextField
                        label="TAGS: Enter comma seperated (Eg : Hot,Spicy)"
                        variant="outlined"
                        value={alltags}
                        onChange={onChangeTags}
                    />
                </Grid><br></br>
      <Grid item xs={20}>
                    <TextField
                        label="ADDON NAME: Enter comma seperated (Eg : Cheese, masala)"
                        variant="outlined"
                        value={alladdonname}
                        onChange={onChangeaddonname}
                    />
                </Grid><br></br>
                <Grid item xs={20}>
                    <TextField
                        label="ADDON PRICE: Enter comma seperated (Eg : 10,20)"
                        variant="outlined"
                        value={alladdonprice}
                        onChange={onChangeaddonprice}
                    />
                </Grid><br></br>
      < Grid item xs={12}>
        <Button variant="contained" value="change" onClick={InsertFood}>Add Food Item</Button>
      </Grid></Grid></Grid>
                </>
                );

};