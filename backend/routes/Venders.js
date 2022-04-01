var express = require("express");
var router = express.Router();

// Load Vender and food model
const vender = require("../models/vender");
const food = require("../models/Food");
const order = require("../models/orders");
const User = require("../models/Users");
const { response } = require("express");
// GET request 
// Getting all the venders
router.get("/", function (req, res) {
    vender.find(function (err, venders) {
        if (err) {
            console.log(err);
        } else {
            res.json(venders);
        }
    })
});

// GET request 
// Getting all the venders
router.get("/food", function (req, res) {
    food.find(function (err, foods) {
        if (err) {
            return res.status(404).send("Unable to display food info");
        } else {
            res.status(200).json(foods);
        }
    })
});
//add food
router.post("/addFood", (req, res) => {

    const newUser = new food({
        name: req.body.name,
        price: req.body.price,
        date: req.body.date,
        vegornonveg: req.body.vegornonveg,
        total: req.body.total,
        rate: req.body.rate,
        vendor_id: req.body.vendor_id,
        vendor_name: req.body.vendor_name,
        tags: req.body.tags,
        addon_name: req.body.addon_name,
        addon_price: req.body.addon_price,
        vendor_shop: req.body.vendor_shop
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send("Could not insert food");
        });
});

router.post("/removeFood", (req, res) => {
    food.deleteOne({ _id: req.body.food_id }).then(user => {
        res.status(200).send("Deleted Food");
    })
        .catch(err => {
            res.status(400).send("Unsuccessful deletion");
        });

});

router.post("/Changeorderstatus", (req,res) => {
    const id = req.body.id;
    const current_status = req.body.status;
    if(current_status === "PLACED")
    {
        order.updateOne({_id : id},
            {"status" : "ACCEPTED"}, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if(current_status === "ACCEPTED")
    {
        order.updateOne({_id : id},
            {"status" : "COOKING"}, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if(current_status === "COOKING")
    {
        order.updateOne({_id : id},
            {"status" : "READY FOR PICKUP"}, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if(current_status === "REJECTED")
    {
        order.updateOne({_id : id},
            {"status" : "REJECTED"}, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    User.findOne({ _id: req.body.buyer_id }).then(user => {
                        // Check if user name exists
                        if (!user) {
                            return res.status(404).send("Could not find user");
                        }
                        else
                        {
                           var current_wallet = user.wallet;
                            User.updateOne({_id : req.body.buyer_id},
                                {wallet: (Number(current_wallet) + Number(req.body.total_price))}, function (err, docs) {
                                    if (err) {
                                        return res.status(404).send("Issue in updation");
                                    }
                                    else {
                                        return res.status(200).send("Updated");
                                    }
                                });
                        }
                
                    });
                   
                }
            });
    }
    else;
});

router.post("/countOrders", (req, res) => {
    const detail = req.body.detail;
    if(detail === "all")
    {
        order.countDocuments({"vendor_id" : req.body.vendor_id} ,function (err, count) {
            if (err){
                return res.status(400).send("Could not count all orders");
            }else{
                return res.status(200).send(String(count));
            }
        });
    }
    else if(detail === "completed")
    {
        order.countDocuments({"vendor_id" : req.body.vendor_id, "status" : "COMPLETED"} ,function (err, count) {
            if (err){
                return res.status(400).send("Could not count all orders");
            }else{
                return res.status(200).send(String(count));
            }
        });
    }
    else
    {
        order.countDocuments({"vendor_id" : req.body.vendor_id, "status" : "REJECTED"} ,function (err, count) {
            if (err){
                return res.status(400).send("Could not count all orders");
            }else{
                return res.status(200).send(String(count));
            }
        });
    }
});
router.post("/EditFood", (req, res) => {
    const detail = req.body.detail;
    const value = req.body.value;
    const id = req.body.id;
    const addon_prices = req.body.new_addon_prices;
    //const total_rates = req.body.total_rates;
    if (detail === "name") {
        food.updateOne({ _id: id },
            { "name": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if (detail === "price") {
        food.updateOne({ _id: id },
            { "price": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if (detail === "vegornonveg") {
        food.updateOne({ _id: id },
            { "vegornonveg": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if (detail === "rate") {
        var current_total;
        var current_rate;
        food.findOne({ _id: id }).then(food_item => {
            // Check if user name exists
            if (!food_item) {
                return res.status(400).send("Could not find food item");
            }
            else
            {
                current_total = food_item.total;
                current_rate = food_item.rate;
                food.updateOne({ _id: id },
                    { "rate": Number(value)+Number(current_rate) }, function (err, docs) {
                        if (err) {
                            return res.status(404).send("Issue in updation");
                        }
                        else {
                            food.updateOne({ _id: id },
                                { "total": Number(current_total)+1 }, function (err, docs) {
                                    if (err) {
                                        return res.status(404).send("Issue in updation");
                                    }
                                    else {
                                        order.updateOne({_id : req.body.order_id},
                                            { "is_rated": "YES" }, function (err, docs) {
                                                if (err) {
                                                    return res.status(404).send("Issue in updation");
                                                }
                                                else
                                                {
                                                    return res.status(200).send("Succesfully updated");
                                                }
                                            })
                                    }
                                });
                        }
                    });
            }
           
        });
        
           
    }
    else if (detail === "tags") {
        food.updateOne({ _id: id },
            { "tags": value.split(',') }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else {
        food.updateOne({ _id: id },
            { "addon_name": value.split(',') }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation for name");
                }
                else {
                    food.updateOne({ _id: id },
                        { "addon_price": addon_prices }, function (err, docs) {
                            if (err) {
                                return res.status(404).send("Issue in updation for prices");
                            }
                            else {
                                return res.status(200).send("Updated");
                            }
                        });
                }
            });
    }
});

// POST request 
// Login
router.post("/signin", (req, res) => {
    var name = req.body.name;
    if (req.body.detail === "name") {
        name = req.body.value;
    }
    // Find user by name
    vender.findOne({ name }).then(vendor => {
        // Check if user name exists
        if (!vendor) {
            return res.status(404).send("New vendor not found");
        }
        else {
            return res.status(200).send(vendor._id);
        }
    });
});

router.post("/details", (req, res) => {
    const id = req.body.id;
    // Find user by name
    vender.findOne({ _id: id }).then(vendor => {
        // Check if user name exists
        if (!vendor) {
            return res.status(404).send("Could not find vendor");
        }
        return res.status(200).send(vendor);

    });
});

router.post("/change", (req, res) => {
    const detail = req.body.detail;
    const value = req.body.value;
    const id = req.body.id;

    //vender.deleteOne({_id:id});
    if (detail === "name") {
        vender.updateOne({ _id: id },
            { "name": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    food.updateMany({ vendor_id: String(id) },
                        { "vendor_name": value }, function (err, docs) {
                            if (err) {
                                return res.status(404).send("Issue in updation for food");
                            }
                            else {
                                return res.status(200).send("Updated");
                            }
                        });
                }
            });
    }
    else if (detail === "email") {
        vender.updateOne({ _id: id },
            { "email": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if (detail === "contact") {
        vender.updateOne({ _id: id },
            { "contact": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if (detail === "Open") {
        vender.updateOne({ _id: id },
            { "Open": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if (detail === "Close") {
        vender.updateOne({ _id: id },
            { "Close": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else {
        vender.updateOne({ _id: id },
            { "shop": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                
                    food.updateMany({ vendor_id: id },
                        { "vendor_shop": value }, function (err, docs) {
                            if (err) {
                                return res.status(404).send("Issue in updation for food");
                            }
                            else {
                                return res.status(200).send("Updated");
                            }
                        });
                }
            });
    }



    // if(detail!=="name"){
    //     vender.deleteOne({ _id: id }).catch(err => { return res.status(404).send(err) });
    // }


})
module.exports = router;
