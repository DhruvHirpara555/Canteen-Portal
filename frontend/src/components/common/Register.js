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
import FormHelperText from '@mui/material/FormHelperText';






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
  const [openingtimehours, setOpeningtimehours] = useState("");
  const [openingtimemins, setOpeningtimemins] = useState("");
  const [closingtimehours, setClosingtimehours] = useState("");
  const [closingtimemins, setClosingtimemins] = useState("");



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

  const onChangeOpeningtimemins = (event) => {
    setOpeningtimemins(event.target.value);
  };

  const onChangeOpeningtimehours = (event) => {
    setOpeningtimehours(event.target.value);
  };

  const onChangeClosingtimemins = (event) => {
    setClosingtimemins(event.target.value);
  };

  const onChangeClosingtimehours = (event) => {
    setClosingtimehours(event.target.value);
  };


  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setContact("");
    setBatchName("");
    setAge("");
    setShopname("");
    setOpeningtimehours("");
    setOpeningtimemins("");
    setClosingtimehours("");
    setClosingtimemins("");
    setType("");
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
        batchName: batchName,
        type : Type
      };

      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
      console.log(newUser);
      axios
      .post("http://localhost:4000/user/register", newUser, axiosConfig)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });
    }
    else if (Type === "vendor") {
      const openingtime = parseInt(openingtimehours)*60 + parseInt(openingtimemins)
      const closingtime = parseInt(closingtimehours)*60 + parseInt(closingtimemins)
      const newUser = {
        name: name,
        email: email,
        password: password,
        Contact: Contact,
        shopname: shopname,
        openingtime: openingtime,
        closingtime: closingtime,
        type : Type
      };
      console.log(newUser);
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
            required
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
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
            required
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
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
            required
            label="Batch Name"
            variant="outlined"
            value={batchName}
            onChange={onChangeBatchName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
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
            required
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
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
            required
            label="Shop Name"
            variant="outlined"
            value={shopname}
            onChange={onChangeShopname}
          />
        </Grid>
        <Grid item xs={12}>
      <div>
      Opening Time <br></br>
      <FormControl sx={{ m: 1, minWidth: 110 }}>
        <InputLabel id="demo-simple-select-helper-label">Open Time(HH)</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={openingtimehours}
          label="Opening Time (HH)"
          onChange={onChangeOpeningtimehours}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={1}>01</MenuItem>
          <MenuItem value={2}>02</MenuItem>
          <MenuItem value={3}>03</MenuItem>
          <MenuItem value={4}>04</MenuItem>
          <MenuItem value={5}>05</MenuItem>
          <MenuItem value={6}>06</MenuItem>
          <MenuItem value={7}>07</MenuItem>
          <MenuItem value={8}>08</MenuItem>
          <MenuItem value={9}>09</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={22}>22</MenuItem>
          <MenuItem value={23}>23</MenuItem>
        </Select>
        <FormHelperText>Hours(0-23)</FormHelperText>
      </FormControl>




      <FormControl sx={{ m: 1, minWidth: 110 }}>
        <InputLabel id="demo-simple-select-helper-label">Open Time(MM)</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={openingtimemins}
          label="Opening Time (MM)"
          onChange={onChangeOpeningtimemins}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={45}>45</MenuItem>
        </Select>
        <FormHelperText>Minutes (0-60)</FormHelperText>
      </FormControl>
        </div>
        </Grid>
        <Grid item xs={12}>
      <div>

      Closing Time <br></br>
      <FormControl sx={{ m: 1, minWidth: 110 }}>
        <InputLabel id="demo-simple-select-helper-label">Close Time(HH)</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={closingtimehours}
          label="Closing Time (HH)"
          onChange={onChangeClosingtimehours}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={1}>01</MenuItem>
          <MenuItem value={2}>02</MenuItem>
          <MenuItem value={3}>03</MenuItem>
          <MenuItem value={4}>04</MenuItem>
          <MenuItem value={5}>05</MenuItem>
          <MenuItem value={6}>06</MenuItem>
          <MenuItem value={7}>07</MenuItem>
          <MenuItem value={8}>08</MenuItem>
          <MenuItem value={9}>09</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={22}>22</MenuItem>
          <MenuItem value={23}>23</MenuItem>
        </Select>
        <FormHelperText>Hours(0-23)</FormHelperText>
      </FormControl>




      <FormControl sx={{ m: 1, minWidth: 10 }}>
        <InputLabel id="demo-simple-select-helper-label">Closing Time(MM)</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={closingtimemins}
          label="Closing Time (MM)"
          onChange={onChangeClosingtimemins}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={45}>45</MenuItem>
        </Select>
        <FormHelperText>Minutes (0-60)</FormHelperText>
      </FormControl>
        </div>
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
