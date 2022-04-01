
import * as React from 'react';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useState , useEffect} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

export default function B_orders() {
  
  if (localStorage.getItem("id") == null || localStorage.getItem("choice") !== "Buyer") {
    window.location.href = "/signin";
  }
  if(localStorage.getItem("food_id") === null)
  {
      window.location.href="/b_home";
  }

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const [food_name, setFoodname] = useState("");
  const [vendor_shop, setShop] = useState("");
  const [vendor_name, setvendorname] = useState("");
  const [vendor_id, setvendorid] = useState("");
  const [price, setPrice] = useState("");
  const [wallet, setWallet] = useState("");
  const [all_addons_name, setAlladdonnames] = useState([""]);
  const [all_addons_prices, setAlladdonprices] = useState([""]);
  const [quantity, setQuantity] = useState(0);
  const [currentAddon, setCurrentAddon] = useState("");
  const [final_addons, setFinaladdons] = useState([""]);
  const ChangeQuantity = (event) => {
    setQuantity((event.target.value));
  };
  const Changecurrentaddon = (event) => {
    setCurrentAddon(event.target.value);
    setFinaladdons(currentAddon.split(','));
  };
  useEffect( () => {
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

      const Food = {
        id: localStorage.getItem("food_id")
      };
    axios
      .post("api/user/Fooddetails",Food)
      .then((response) => {
        if (response.status === 200) {
          setFoodname(response.data.name);
          setvendorname(response.data.vendor_name);
          setvendorid(response.data.vendor_id);
          setShop(response.data.vendor_shop);
          setPrice(response.data.price);
          setAlladdonnames((response.data.addon_name));
          setAlladdonprices((response.data.addon_price));
        }
        else {
          alert(response.data);
        }

      });
    },[]);



  const Addorder = () => {
    var total = price;
    final_addons.forEach(function (item, index) {
      let pos = all_addons_name.indexOf(item);
      if(pos===-1)
      {
        //alert("No addons added");
      }
      else
      {
        total = total + Number(all_addons_prices[pos]);
      }
    });
    total = total*quantity;
    if(total>wallet)
    {
      alert("Order amount exceeds wallet by "+(total-wallet));
    }
    else
    {
    //alert("Order amount : "+total);

    const newItem = {
      vendor_id:vendor_id,
      vendor_name : vendor_name,
      vendor_shop: vendor_shop,
      date: Date.now(),
      status: "PLACED",
      addon_name: final_addons,
      food_id: String(localStorage.getItem("food_id")),
      food_name: food_name,
      total_price: Number(total),
      quantity: Number(quantity),
      buyer_id:String(localStorage.getItem("id")),
      is_rated : "NO"
    };
    axios
      .post("api/user/addorder", newItem)
      .then((response) => {
        if(response.status===200)
        {
          alert(response.data);
          const NewDetail = {
            detail: "wallet",
            value: Number(wallet-total),
            id: localStorage.getItem("id"),
          };
      
          axios
            .post("api/user/change", NewDetail)
            .then((response) => {
              if (response.status === 200) {
                console.log(NewDetail);
                window.location.href = "/b_myorders";
              }
              else {
                alert(response.data);
              }
            });
        }
        else{
          alert(response.data);
        }
        
      });
    }

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
            <Button color="inherit" onClick={() => window.location.href = "/signin"}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <br></br>
  <h2 align="center">Wallet : {wallet}</h2><br></br>
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
                        Name : {food_name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Add ons: {String(all_addons_name)} with Prices : {String(all_addons_prices)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      ${price}
                      <br></br>
                      Vendor : {vendor_name}<br></br>
                      Shop : {vendor_shop}<br></br>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper><br></br>
            <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
            <TextField
              label="Quantity"
              variant="outlined"
              value={quantity}
              onChange={ChangeQuantity}
            />
          </Grid>
          
           <Grid item xs={12}>
           <h3 align = "center">Choose Addon from Add ons: {String(all_addons_name)} with Prices : {String(all_addons_prices)}</h3>
           <Grid item xs={12}>
            <TextField
              label="Choose addons"
              variant="outlined"
              value={currentAddon}
              onChange={Changecurrentaddon}
            />
          </Grid>
          < Grid item xs={12}>
        <Button variant="contained" value="change" onClick={Addorder}>Order</Button>
      </Grid>
          </Grid> 
            </Grid>
   </>
  );
}