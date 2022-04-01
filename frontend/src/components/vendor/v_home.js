import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState ,useEffect} from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';

export default function Vendor_home() {
  if (localStorage.getItem("id") === null || localStorage.getItem("choice") != "Vendor") {
    window.location.href = "/signin";
  }
  const [all_food, setallfood] = useState("");
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const editFood = (id) => {
    localStorage.setItem("food_id", id);
    window.location.href = "/v_editfood";
  };
  const delFood = (id) => {
    //event.preventDefault();
    const NewDetail = {
      food_id: id
    };
    axios
      .post("api/vender/removeFood", NewDetail)
      .then((response) => {
        if (response.status === 400) {
          alert(response.data);
        }
        else {
          window.location.href = "/v_home";
        }
      });

  };

  useEffect(() => {
    //event.preventDefault();
    axios
      .get("api/vender/food")
      .then((response) => {
        if (response.status === 404) {
          alert(response.data);
        }
        else {
          setallfood(response.data);
          console.log(all_food);
          //alert(all_food);

        }

      });

  },[]);


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
            <Button color="inherit" onClick={() => window.location.href = "/v_orders"}>
              My orders
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/v_statistics"}>
              My Statistics
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/register"}>
              Register
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/v_profile"}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/signin"}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box><br></br><br></br>
      <Grid container align={"center"} spacing={2}>
        < Grid item xs={12}>
          <Button variant="contained" value="change" onClick={() => window.location.href = "/v_addFood"}>Add Food</Button>
        </Grid>
      </Grid>



      {all_food === "" ? (<></>) : (<>

        {all_food.map(item => (
          <>
            {item["vendor_id"] === localStorage.getItem("id") ? (<>

              <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="food image" src="https://cdn.britannica.com/w:400,h:300,c:crop/36/123536-004-1780EFF1/Variety-fruits-vegetables.jpg" />
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
                      <Grid item>
                        < Grid item xs={12}>
                          <Button variant="contained" value="change" onClick={() => { editFood(item["_id"]) }}>Edit</Button>
                        </Grid><br></br>
                        < Grid item xs={12}>
                          <Button variant="contained" value="change" onClick={() => { delFood(item["_id"]) }}>Remove</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        ${item["price"]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>


            </>) : (<></>)}
          </>
        ))}
      </>)}
    </>
  );
}