import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




// const Register = (props) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [date, setDate] = useState(null);

//   const onChangeUsername = (event) => {
//     setName(event.target.value);
//   };

//   const onChangeEmail = (event) => {
//     setEmail(event.target.value);
//   };

//   const resetInputs = () => {
//     setName("");
//     setEmail("");
//     setDate(null);
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();

//     const newUser = {
//       name: name,
//       email: email,
//       date: Date.now(),
//     };

//     axios
//       .post("http://localhost:4000/user/register", newUser)
//       .then((response) => {
//         alert("Created\t" + response.data.name);
//         console.log(response.data);
//       });

//     resetInputs();
//   };

//   return (
//     <Grid container align={"center"} spacing={2}>
//       <Grid item xs={12}>
//         <TextField
//           label="Name"
//           variant="outlined"
//           value={name}
//           onChange={onChangeUsername}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Email"
//           variant="outlined"
//           value={email}
//           onChange={onChangeEmail}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <Button variant="contained" onClick={onSubmit}>
//           Register
//         </Button>
//       </Grid>
//     </Grid>
//   );

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Type, setType] = React.useState('');
  const [password, setPassword] = useState("");
  const [Contact, setContact] = useState("");
  const [batchName, setBatchName] = useState("");
  const [age, setAge] = useState("");
  const [shopname, setShopname] = useState("");
  const [openingtime, setOpeningtime] = useState("");
  const [closingtime, setClosingtime] = useState("");


  const handleChange = (event) => {
    setType(event.target.value);
  };

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeBatchName = (event) => {
    setBatchName(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeShopname = (event) => {
    setShopname(event.target.value);
  };

  const onChangeOpeningtime = (event) => {
    setOpeningtime(event.target.value);
  };

  const onChangeClosingtime = (event) => {
    setClosingtime(event.target.value);
  };


  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setContact("");
    setBatchName("");
    setAge("");
    setShopname("");
    setOpeningtime("");
    setClosingtime("");
  };

  const onSubmit = (event) => {
    event.preventDefault();


    if (Type === "buyer") {
      const newUser = {
        name: name,
        email: email,
        password: password,
        Contact: Contact,
        age: age,
        batchName: batchName
      };
      axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });
    }
    else if (Type === "vendor") {
      const newUser = {
        name: name,
        email: email,
        password: password,
        Contact: Contact,
        shopname: shopname,
        openingtime: openingtime,
        closingtime: closingtime
      };

      axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });
    }





    resetInputs();
  };

  if (Type === "") {
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
            value={Contact}
            onChange={onChangeContact}
          />
        </Grid>
        <Grid item xs={12}>
          <div>
            <FormControl sx={{ m: 0, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={Type}
                onChange={handleChange}
                autoWidth
                label="Type"
              >

                <MenuItem value={"buyer"}>Buyer</MenuItem>
                <MenuItem value={"vendor"}>Vendor</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>

      </Grid>
    );
  };

  if (Type === "buyer") {
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
            value={Contact}
            onChange={onChangeContact}
          />
        </Grid>
        <Grid item xs={12}>
          <div>
            <FormControl sx={{ m: 0, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={Type}
                onChange={handleChange}
                autoWidth
                label="Type"
              >

                <MenuItem value={"buyer"}>Buyer</MenuItem>
                <MenuItem value={"vendor"}>Vendor</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Batch Name"
            variant="outlined"
            value={batchName}
            onChange={onChangeBatchName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
        </Grid>
      </Grid>
    );
  };

  if(Type === "vendor")
  {
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
            value={Contact}
            onChange={onChangeContact}
          />
        </Grid>
        <Grid item xs={12}>
          <div>
            <FormControl sx={{ m: 0, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={Type}
                onChange={handleChange}
                autoWidth
                label="Type"
              >
                <MenuItem value="">
                  <em>select Type</em>
                </MenuItem>
                <MenuItem value={"buyer"}>Buyer</MenuItem>
                <MenuItem value={"vendor"}>Vendor</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Shop Name"
            variant="outlined"
            value={shopname}
            onChange={onChangeShopname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Opening Time"
            variant="outlined"
            value={openingtime}
            onChange={onChangeOpeningtime}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Closing Time"
            variant="outlined"
            value={closingtime}
            onChange={onChangeClosingtime}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
        </Grid>
      </Grid>
    );
  }

}



export default Register;
