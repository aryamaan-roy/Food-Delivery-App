import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/Search";

export default function Buyer_home() {
  if (localStorage.getItem("id") === null || localStorage.getItem("choice") != "Buyer") {
    window.location.href = "/signin";
  }
  const [all_food, setallfood] = useState("");
  const [sortedfood, setSortedfood] = useState([]);
  const [sortName_price, setSortName_price] = useState(true);
  const [sortName_rate, setSortName_rate] = useState(true);
  const [wallet, setWallet] = useState("");
  const [searchText, setSearchText] = useState("");
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });


  const orderFood = (id) => {
    localStorage.setItem("food_id",id);
    window.location.href = "/b_orders";
  };

  // const editRating = (event,id,old_rate,total) => {
  //   setRate(Number(event.target.value));
  //   const NewDetail = {
  //     detail: "rate",
  //     value: Number(old_rate+rate),
  //     id: id,
  //     total_rates: Number(total+1)
  //   };
  //   alert(Number(old_rate+rate));
  //   console.log(NewDetail);
  //   if(rate!==0){
  //     axios
  //     .post("api/vender/EditFood", NewDetail)
  //     .then((response) => {
  //       if (response.status === 404) {
  //         alert(response.data);
  //       }
  //       else {
  //         console.log(NewDetail);
  //       }
  //     });
  //   }
  // };
   useEffect(() => {
    //localStorage.removeItem("food_id");
    const Buyer = {
      id: localStorage.getItem("id")
    };
    axios.post("api/user/details", Buyer)
      .then((response) => {
        if (response.status === 200) {
          setWallet(response.data.wallet);
        }
        else {
          alert(response.data);
        }
      });
    axios
      .get("api/vender/food")
      .then((response) => {
        if (response.status === 404) {
          alert(response.data);
        }
        else {
          setallfood(response.data);
          setSortedfood(response.data);
          console.log(all_food);
          //alert(all_food);

        }

      });
    },[]);

    const sortChange = () => {
      let usersTemp = all_food;
      const flag = sortName_price;
      usersTemp.sort((a, b) => {
        if (a.price != undefined && b.price != undefined) {
          return (1 - flag * 2) * (new Number(a.price) - new Number(b.price));
        } else {
          return 1;
        }
      });
      setallfood(usersTemp);
      setSortName_price(!sortName_price);
    };

    const sortChangeRate = () => {
      let usersTemp = all_food;
      const flag = sortName_rate;
      usersTemp.sort((a, b) => {
        if (a.total != 0 && b.total != 0) {
          return (1 - flag * 2) * (new Number(Number(a.rate) /Number(a.total))) -(new Number(Number(b.rate) /Number(b.total)));
        } else {
          return 1;
        }
      });
      setallfood(usersTemp);
      setSortName_rate(!sortName_rate);
    };
    const customFunction = (event) => {
      console.log(event.target.value);
      setSearchText(event.target.value);
      const Item = {
        name: searchText
      };
      axios.post("api/user/foodsearch", Item)
      .then((response) => {
        if (response.status === 200) {
          setallfood(response.data);
        }
        else
        {
          setallfood(sortedfood);
        }
      });
      
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
            <Button color="inherit" onClick={() => window.location.href = "/b_home"}>
              Home
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/b_myorders"}>
              My orders
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/b_wallet"}>
              Wallet
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
      </Box><br></br><br></br>
      
      <h2 align="center">Wallet : {wallet}</h2>

       <br></br>
       <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            onChange={customFunction}
            /><br></br>
       <Button onClick={sortChange}>
                      {sortName_price ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Price
                    <Button onClick={sortChangeRate}>
                      {sortName_rate ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Rating
       <br></br>

      {all_food === "" ? (<></>) : (<>

        {all_food.map(item => (
          <>
            <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="food image" src="https://media.istockphoto.com/photos/colorful-vegetables-and-fruits-vegan-food-in-rainbow-colors-picture-id1284690585?b=1&k=20&m=1284690585&s=170667a&w=0&h=HlEPBNsYMVuu-SsohPliBWHJy-IhW9y-fl8dS9KnBBo=" />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        Name : {item["name"]}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Veg/Non-Veg : {item["vegornonveg"]}<br></br>
                        Tags : {String(item["tags"])}<br></br>
                        Add ons: {String(item["addon_name"])} with Prices : {String(item["addon_price"])}
                      </Typography>
                      {item["total"] === 0 ? (<>
                        <Typography variant="body2" color="text.secondary">
                        Rating : 0
                      </Typography>
                      </>) : (<>
                        <Typography variant="body2" color="text.secondary">
                        Rating : {parseFloat(item["rate"]).toFixed(2) / parseFloat(item["total"]).toFixed(2)}
                      </Typography>
                      </>)}
                      
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      ${item["price"]}
                      <br></br>
                      Vendor : {item["vendor_name"]}<br></br>
                      Shop : {item["vendor_shop"]}<br></br>
                      < Grid item xs={12}>
          <Button variant="contained" value="change" onClick={() => {orderFood(item["_id"])}}>Order</Button>
        </Grid>
                      {/* <FormControl sx={{ m: 5, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rate}
          label="Change Value"
          onChange={() => {editRating(item["_id"],item["rate"],item["total"])}}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
        </Select>
      </FormControl></Grid> */}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </>
        ))}
      </>)}
    </>
  );
}