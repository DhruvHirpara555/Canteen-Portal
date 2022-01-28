import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, InputNumber,Modal } from "antd";



async function decodetoken(token) {

  console.log("decoding token");

  const u = await axios.get("http://localhost:4000/decode/", {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  console.log(u);
  return u.data;
  // await axios.get("http://localhost:4000/decode/",{
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // })
  // .then((response) => {
  //   console.log(response.data);
  //   return response.data;
  // })
  // .catch((error) => {
  //   console.log(error.response.data);
  // });


}

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [visible, setVisible] = useState(false);
  const [money, setMoney] = useState(false);
  const [addmoney] = Form.useForm();

  useEffect(async () => {
    // decode the token from local storage
    const token = await sessionStorage.getItem("token");
    if (token) {
      // if we have a token, then we should have a user
      // decode the token from server and set the user
      const u = await decodetoken(token);
      console.log(u);
      setUser(u.type);
      if (u.type === "buyer") {
        axios.get("http://localhost:4000/buyerdash/money", {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
          .then(res => {
            setWallet(res.data.wallet);
            console.log(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
    else {
      setUser(null);
    }


  }, [navigate,money]);

  if (user === null) {

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/users")}>
              Users
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

  if (user === "buyer") {




    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Button color="inherit" onClick={() => navigate("/bdashboard")}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/logout")}>
              Logout
            </Button>
            <Button color="inherit" onClick={() => { setVisible(true) }}>
              Add Money
            </Button>
            <Button color="inherit" disabled>
              Wallet Balance: {wallet}
            </Button>
            <Modal title="Add Money to Wallet"
              visible={visible}
              onOk={() => {
                addmoney.validateFields().then(values => {
                  console.log(values);
                  axios.post("http://localhost:4000/buyerdash/addmoney", {
                    amount: values.amount
                  }, {
                    headers: {
                      authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                  })
                    .then(res => {
                      console.log("hi");
                      console.log(res.data);
                      setVisible(false);
                      setMoney(!money);
                    })
                    .catch(err => {
                      console.log(err);
                    })
                }
                )

              }}
              onCancel={() => {
                setVisible(false);
              }}
            >
              <Form form={addmoney} title="Add money to wallet" initialValues={{ remember: true }}>
                <Form.Item name="amount"
                  rules={[{ required: true, message: "Value required" },{type: 'number',min : 0}]}
                >
                  <InputNumber placeholder="Amount" />
                </Form.Item>
              </Form>
            </Modal>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  if (user === "vendor") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/vdashboard")}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => navigate("/orderdashboard")}>
              orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/logout")}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default Navbar
