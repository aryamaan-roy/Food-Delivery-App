import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';


const Register = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState(null);
  const [password, setPassword] = useState("");
  const [choice, setChoice] = useState("");
  const [shop, setShop] = useState("");
  const [open_time, setOpenTime] = useState("");
  const [close_time, setCloseTime] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };
  const onChangeOpenTime = (event) => {
    setOpenTime(String(event.target.value));
  };
  const onChangeCloseTime = (event) => {
    setCloseTime(String(event.target.value));
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeChoice = (event) => {
    setChoice(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setBatch("");
    setContact("");
    setAge("");
    setPassword("");
    setChoice("");
    setShop("");
    setDate(null);
    setOpenTime("");
    setCloseTime("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      batch: batch,
      contact: contact,
      age: age,
      password: password,
      date: Date.now(),
      choice: choice,
      shop: shop,
      open_time:open_time,
      close_time:close_time
    };

    axios
      .post("api/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
        window.location.href="/signin";
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact"
          variant="outlined"
          value={contact}
          onChange={onChangeContact}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" value="Buyer" onClick={onChangeChoice}>Buyer</Button>
        <Button variant="contained" value="Vender" onClick={onChangeChoice}>Vender</Button>
      </Grid>
      {choice === "Buyer" ? (
        <>
          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              value={age}
              onChange={onChangeAge}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" value="UG1" onClick={onChangeBatch}>UG1</Button>
            <Button variant="contained" value="UG2" onClick={onChangeBatch}>UG2</Button>
            <Button variant="contained" value="UG3" onClick={onChangeBatch}>UG3</Button>
            <Button variant="contained" value="UG4" onClick={onChangeBatch}>UG4</Button>
          </Grid> </>) : (<>
            <Grid item xs={12}>
              <TextField
                label="Shop"
                variant="outlined"
                value={shop}
                onChange={onChangeShop}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="time"
                label="Opening Time"
                type="time"
                defaultValue="10:00"
                value={open_time}
                onChange={onChangeOpenTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
              /></Grid>
            <Grid item xs={12}>
              <TextField
                id="time"
                label="Closing Time"
                type="time"
                defaultValue="10:00"
                value={close_time}
                onChange={onChangeCloseTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
              /></Grid>
          </>)
      }

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>


      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="#" variant="body2" onClick={() => navigate("/signin")}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
