import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from "@mui/material/TextField";
export default function B_myorders() {
    if (localStorage.getItem("id") === null || localStorage.getItem("choice") != "Buyer") {
        window.location.href = "/signin";
    }
    const [all_orders, setallorders] = useState("");
    const [currentrate, setCurrentrating] = useState("");
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const Changecurrentrating = (event) => {
        setCurrentrating(event.target.value);
    };

    const ChangeRating = (food_id, order_id) => {
        const NewDetail = {
            detail: "rate",
            value: Number(currentrate),
            id: food_id,
            order_id: order_id
        };
        if (Number(currentrate) >= 1 && Number(currentrate) <= 5) {
            console.log(NewDetail);
            axios
                .post("api/vender/EditFood", NewDetail)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(NewDetail);
                        alert("Thank you for rating");
                        window.location.href = "/b_home";
                    }
                    else {
                        alert(response.data);
                    }
                });
        }
        else {
            alert("Incorrect rating given");
        }
    };
    const ChangeStatus = (id) => {
        const OrderID = {
            id: id
        };
        axios
            .post("api/user/Changeorderstatus", OrderID)
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = "/b_myorders";
                }
                else {
                    alert(response.data);
                }
            });
    };

    useEffect(() => {
        //event.preventDefault();
        axios
            .get("api/user/order")
            .then((response) => {
                if (response.status === 200) {
                    setallorders(response.data);
                    console.log(all_orders);
                    //alert(all_food);
                }
                else {
                    alert(response.data);

                }

            });

    }, []);


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
                        <Button color="inherit" onClick={() => window.location.href = "/b_wallet"}>
                            Wallet
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
            </Box><br></br><br></br>

            {all_orders === "" ? (<></>) : (<>

                {all_orders.map(item => (
                    <>
                        {item["buyer_id"] === localStorage.getItem("id") ? (<>

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
                                                    Food : {item["food_name"]}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Add ons: {String(item["addon_name"])}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Status: {String(item["status"])}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Placed Time : {(item["date"])}
                                                </Typography>
                                            </Grid></Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" component="div">
                                                ₹{item["total_price"]}
                                                {item["status"] === "READY FOR PICKUP" ? (<>
                                                    < Grid item xs={12}>
                                                        <Button variant="contained" value="change" onClick={() => { ChangeStatus(item["_id"]) }}>PICKED UP</Button>
                                                    </Grid><br></br>
                                                </>) : (<></>)}
                                                {item["status"] === "COMPLETED" && item["is_rated"] === "NO" ? (<>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Enter Rating(1-5)"
                                                            variant="outlined"
                                                            value={currentrate}
                                                            onChange={Changecurrentrating}
                                                        />
                                                    </Grid>

                                                    < Grid item xs={12}>
                                                        <Button variant="contained" value="change" onClick={() => { ChangeRating(item["food_id"], item["_id"]) }}>RATE</Button>
                                                    </Grid><br></br>
                                                </>) : (<></>)}
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