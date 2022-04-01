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
import { send } from 'emailjs-com';
export default function V_orders() {
    if (localStorage.getItem("id") === null || localStorage.getItem("choice") != "Vendor") {
        window.location.href = "/signin";
    }
    const [all_orders, setallorders] = useState("");
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const ChangeStatus = (id, status,buyer_id,total_price) => {

        const OrderID = {
            id: id,
            status: status,
            buyer_id: buyer_id,
            total_price: total_price
        };
        if(status === "PLACED")
        {
            var toSend = {
                to_email: 'aryamaanbasu@gmail.com',
                from_name: 'JC',
            };
            send(
                'service_8pbeqn7',
                'template_qcgx9q8',
                toSend,
                'user_A4oXvnjYDb0SShwphkKYh'
              )
                .then((response) => {
                  console.log('SUCCESS!', response.status, response.text);
                })
                .catch((err) => {
                  console.log('FAILED...', err);
                });
        }
        axios
            .post("api/vender/Changeorderstatus", OrderID)
            .then((response) => {
                if (response.status === 200) {
                     window.location.href = "/v_orders";
                }
                else {
                    alert(response.data);
                }
            });
    };

    useEffect( () => {
        //event.preventDefault();
        axios
            .get("api/user/order")
            .then((response) => {
                if (response.status === 200) {
                    setallorders(response.data);
                    //console.log(all_orders);
                    //alert(all_food);
                }
                else {
                    alert(response.data);

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

            {all_orders === "" ? (<></>) : (<>

                {all_orders.map(item => (
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
                                                {item["status"] !== "REJECTED" && item["status"] !== "READY FOR PICKUP" && item["status"] !== "COMPLETED" ? (<>
                                                < Grid item xs={12}>
                                                    <Button variant="contained" value="change" onClick={() => { ChangeStatus(item["_id"], item["status"],item["buyer_id"],item["total_price"])}}>Move to next stage</Button>
                                                </Grid><br></br>
                                                </>) : (<></>)}
                                                {item["status"] === "PLACED"  ? (<>
                                                < Grid item xs={12}>
                                                    <Button variant="contained" value="change" onClick={() => { ChangeStatus(item["_id"], "REJECTED",item["buyer_id"],item["total_price"]) }}>REJECT</Button>
                                                </Grid></> ) : (<></>)}
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