import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

if (localStorage.getItem("id") === null || localStorage.getItem("choice") === null){
  //console.log("here");
  window.location.href ="/signin";
}
if(localStorage.getItem("choice")=="Buyer")
{
  window.location.href ="/b_home";
}
else
{
  window.location.href ="/v_home";
}

};




export default Home;
