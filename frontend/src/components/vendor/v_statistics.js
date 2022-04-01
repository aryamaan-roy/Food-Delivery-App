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


export default function V_statistics() {
    if (localStorage.getItem("id") === null || localStorage.getItem("choice") != "Vendor") {
        window.location.href = "/signin";
    }
    const [all_orders, setallorders] = useState("");
    const [count_allorders, setCountall] = useState("");
    const [count_completedorders, setCountcompleted] = useState("");
    const [count_rejectorders, setCountreject] = useState("");
    const [total_orders, settotal] = useState(0);
    const [top5, settop5] = useState([""])
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const counts = {};
    var i = 0;
    var items;
    useEffect(() => {
        //event.preventDefault();
        axios
            .get("api/user/order")
            .then((response) => {
                if (response.status === 200) {
                    setallorders(response.data);
                    console.log(all_orders);
                    //alert(all_food);
                   
                    for (const item of all_orders) {
                        if (item["vendor_id"] === localStorage.getItem("id")) {
                            counts[item["food_name"]] = counts[item["food_name"]] ? counts[item["food_name"]] + 1 : 1;
                        }
                    }

                    items = Object.keys(counts).map(
                        (key) => {
                            i = i + 1;
                            return [key, counts[key]]
                        }
                    );

                    // Step - 2
                    // Sort the array based on the second element (i.e. the value)
                    items.sort(
                        (first, second) => { return second[1] - first[1] }
                    );
                    if (i > 5) {
                        i = 5;
                    }
                    var final_array="";
                    for(let j=0;j<i;j++)
                    {
                        final_array=final_array+"," +String(items[j][0]);
                    }
                    settop5((final_array).split(','));
                    settotal(i);
                    
                }
                else {
                    alert(response.data);

                }

            });
        const Venderdetail = {
            detail: "all",
            vendor_id: localStorage.getItem("id")
        };
        axios
            .post("api/vender/countOrders", Venderdetail)
            .then((response) => {
                if (response.status === 200) {
                    setCountall(response.data);
                }
                else {
                    alert(response.data);
                }

            });
        const Vender2detail = {
            detail: "completed",
            vendor_id: localStorage.getItem("id")
        };
        axios
            .post("api/vender/countOrders", Vender2detail)
            .then((response) => {
                if (response.status === 200) {
                    setCountcompleted(response.data);
                }
                else {
                    alert(response.data);
                }

            });
        const Vender3detail = {
            detail: "rejected",
            vendor_id: localStorage.getItem("id")
        };
        axios
            .post("api/vender/countOrders", Vender3detail)
            .then((response) => {
                if (response.status === 200) {
                    setCountreject(response.data);
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
            </Box><br></br><br></br><h2 align="center">
                Placed Orders : {count_allorders}<br></br>
                Pending Orders : {Number(count_allorders) - Number(count_completedorders) - Number(count_rejectorders)}<br></br>
                Completed Orders : {count_completedorders}<br></br>
                Rejected Orders : {count_rejectorders}<br></br>
                <br></br><ol>
                Top 5 Items sold : {top5.slice(1,total_orders+1).map(item => (<>
                <li key={item}>{item}</li>
                </>))}</ol><br></br> 
            </h2><br></br>
        </>
    );
}