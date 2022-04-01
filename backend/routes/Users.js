var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const vender = require("../models/vender");
const order = require("../models/orders");
//GET request 
//Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
 });
 router.get("/order", function (req, res) {
    order.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
 });

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    if (req.body.choice === "Buyer") {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            date: req.body.date,
            contact: req.body.contact,
            batch: req.body.batch,
            age: req.body.age,
            password: req.body.password,
            wallet: 0
        });

        newUser.save()
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    }
    else {
        const newVender = new vender({
            name: req.body.name,
            email: req.body.email,
            date: req.body.date,
            contact: req.body.contact,
            Open: req.body.open_time,
            Close: req.body.close_time,
            shop: req.body.shop,
            password: req.body.password
        });

        newVender.save()
            .then(vender => {
                res.status(200).json(vender);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    }

});

// POST request 
// Login
router.post("/signin", (req, res) => {
    const name = req.body.name;
    // Find user by name
    User.findOne({ name }).then(user => {
        // Check if user name exists as buyer
        if (!user) {
            vender.findOne({ name }).then(ven => {
                // Check if user name exists as vender
                if (!ven) {
                    return res.status(404).json({
                        error: "Email not found",
                    });
                }
                else if (ven.password == req.body.password) {
                    return res.status(200).send(ven._id);
                    //return user;
                }
                else {
                    return res.status(404).json({
                        error: "Password of vender incorrect",
                    });
                }
            });
        }
        else if (user.password == req.body.password) {
            return res.status(202).send(user._id);
            //return user;
        }
        else {
            return res.status(404).json({
                error: "Password of user incorrect",
            });
        }
    });
});


router.post("/details", (req, res) => {
    const id = req.body.id;
    // Find user by name
    User.findOne({ _id: id }).then(user => {
        // Check if user name exists
        if (!user) {
            return res.status(404).send("Could not find user");
        }
        return res.status(200).send(user);

    });
});

router.post("/Fooddetails", (req, res) => {
    const id = req.body.id;
    // Find user by name
    food.findOne({ _id: id }).then(current_food => {
        // Check if user name exists
        if (!current_food) {
            return res.status(404).send("Could not find food item");
        }
        return res.status(200).send(current_food);

    });
});

router.post("/change", (req, res) => {
    const detail = req.body.detail;
    const value = req.body.value;
    const id = req.body.id;

    //vender.deleteOne({_id:id});
    if (detail === "name") {
        User.updateOne({ _id: id },
            { "name": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if (detail === "email") {
        User.updateOne({ _id: id },
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
        User.updateOne({ _id: id },
            { "contact": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if (detail === "age") {
        User.updateOne({ _id: id },
            { "age": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else if (detail === "wallet") {
        User.updateOne({ _id: id },
            { "wallet": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
    else {
        User.updateOne({ _id: id },
            { "batch": value }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
    }
});


router.post("/addorder", (req, res) => {

    const newOrder = new order({
      vendor_id:req.body.vendor_id,
      vendor_name : req.body.vendor_name,
      vendor_shop: req.body.vendor_shop,
      date: req.body.date,
      status: req.body.status,
      addon_name: req.body.addon_name,
      food_id: req.body.food_id,
      food_name: req.body.food_name,
      total_price: req.body.total_price,
      quantity: req.body.quantity,
      buyer_id:req.body.buyer_id,
      is_rated: req.body.is_rated
    });

    newOrder.save()
        .then(user => {
            res.status(200).send("Order placed")
        })
        .catch(err => {
            res.status(400).send("Could not place order");
        });
});

router.post("/Changeorderstatus", (req,res) => {
    const id = req.body.id;
        order.updateOne({_id : id},
            {"status" : "COMPLETED"}, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation");
                }
                else {
                    return res.status(200).send("Updated");
                }
            });
});

router.post("/foodsearch", (req, res) => {
    const name = req.body.name;
    // Find user by name
    food.findOne({ name: name }).then(current_food => {
        // Check if user name exists
        if (!current_food) {
            return res.status(400).send("Could not find food item");
        }
        return res.status(200).send([current_food]);

    });
});
module.exports = router;

