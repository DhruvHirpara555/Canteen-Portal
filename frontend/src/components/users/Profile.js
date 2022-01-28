import axios from "axios";
import { useState, useEffect } from "react";

// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";


import * as React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const Profile = (props) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:4000/profile/",{
      headers : {
                authorization : `Bearer ${token}`
              }
            }) // unimplemented
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [editflag,setEditflag] = useState(true)


    if (details.type === "buyer")
  {
    const onFinish = (values) => {
      console.log(values);
      const token = sessionStorage.getItem("token");
      axios.post("http://localhost:4000/edit/",{
        name: values.user.name,
        email: values.user.email,
        Contact : values.user.Contact,
        batchName: values.buyer.batchName,
        age: values.buyer.age
      },{
        headers :
        {
          authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        console.log(response);
        setEditflag(true);
      }).catch(function (error) {
        console.log(error);
      }
      );


    };

    var forminitial = {
      user: details.user,
      buyer : details.buyer
    }




    const ChangeBool = () => {
      setEditflag(false)
    }



    return (
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues={forminitial}>
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[
            {
              required : true
            },
          ]}
        >
          <Input disabled = {editflag} />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[
            {
              type: 'email',
              required: true
            },
          ]}
        >
          <Input disabled = {editflag}/>
        </Form.Item>
        <Form.Item
          name={['user', 'Contact']}
          label="Contact"
          rules={[
            {
              required : true
            },
          ]}

        >
          <Input disabled = {editflag}/>
        </Form.Item>
        <Form.Item
          name={['buyer', 'batchName']}
          label="Batch"
          rules={[
            {
              required : true
            },
          ]}

        >
          <Input disabled = {editflag}/>
        </Form.Item>



        <Form.Item
          name={['buyer', 'age']}
          label="Age"
          rules={[
            {
              required : true
            },
          ]}

        >
          <InputNumber disabled = {editflag} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary"  disabled = {!editflag} onClick={ChangeBool}>
            Edit
          </Button>
          <Button type="primary" htmlType="submit" disabled = {editflag}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      );

  }
  if (details.type === "vendor")
  {


    const onFinish = (values) => {
      console.log(values);
      const token = sessionStorage.getItem("token");
      const openingtime = parseInt(values.vendor.openingtimemin) + parseInt(values.vendor.openingtimehour)*60;
      const closingtime = parseInt(values.vendor.closingtimemin) + parseInt(values.vendor.closingtimehour)*60;
      axios.post("http://localhost:4000/edit/",{
        name: values.user.name,
        email: values.user.email,
        Contact : values.user.Contact,
        shopname: values.vendor.shopname,
        openingtime: openingtime,
        closingtime: closingtime,
    },{
      headers :
      {
        authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      console.log(response);
      setEditflag(true);
    }).catch(function (error) {
      console.log(error);
    }
    );
  }
    var openingtimehour = parseInt(details.vendor.openingtime/60)
    var openingtimemin = details.vendor.openingtime%60
    var closingtimehour = parseInt(details.vendor.closingtime/60)
    var closingtimemin = details.vendor.closingtime%60
    var forminitial = {
      user : details.user,
      vendor : {
        shopname : details.vendor.shopname,
        openingtimehour : openingtimehour,
        openingtimemin : openingtimemin,
        closingtimehour : closingtimehour,
        closingtimemin : closingtimemin
      }
    }

    console.log(forminitial)


    const ChangeBool = () => {
      setEditflag(false)
    }

    return (
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues={forminitial}>
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[
            {
              required : true
            },
          ]}

        >
          <Input disabled = {editflag} />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input disabled = {editflag}/>
        </Form.Item>
        <Form.Item
          name={['user', 'Contact']}
          label="Contact"
          rules={[
            {
              required : true
            },
          ]}

        >
          <Input disabled = {editflag}/>
        </Form.Item>
        <Form.Item
          name={['vendor', 'shopname']}
          label="Shop - Name"
          rules={[
            {
              required : true
            },
          ]}

        >
          <Input disabled = {editflag}/>
        </Form.Item>

        <Form.Item
          name={['vendor', 'openingtimehour']}
          label="Open time hours"
          rules={[
            {
              required : true,

            },
            {
              type : 'number',
              min : 0,
              max : 23
            }
          ]}

        >
          <InputNumber disabled = {editflag}/>
        </Form.Item>

        <Form.Item
          name={['vendor', 'openingtimemin']}
          label="Open time mins"
          rules={[
            {
              required : true,

            },
            {
              type : 'number',
              min : 0,
              max : 59
            }
          ]}

        >
          <InputNumber disabled = {editflag}/>
        </Form.Item>

        <Form.Item
          name={['vendor', 'closingtimehour']}
          label="Close time hours"
          rules={[
            {
              required : true,

            },
            {
              type : 'number',
              min : 0,
              max : 23
            }
          ]}

        >
          <InputNumber disabled = {editflag}/>
        </Form.Item>

        <Form.Item
          name={['vendor', 'closingtimemin']}
          label="Close time mins"
          rules={[
            {
              required : true
            },
            {
              type : 'number',
              min : 0,
              max : 59
            }
          ]}

        >
          <InputNumber disabled = {editflag}/>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary"  disabled = {!editflag} onClick={ChangeBool}>
            Edit
          </Button>
          <Button type="primary" htmlType="submit" disabled = {editflag}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      );
  }

  return <div></div>


};



// const Profile = async (props) => {

//     const token = await sessionStorage.getItem("token");

//     const detail = await axios.get("http://localhost:4000/dashboard/",{
//       headers : {
//         Authorization : `Bearer ${token}`
//       }
//     })

//     const details = detail.data

//     console.log(details.type)


//   if (details.type === "buyer")
//   {
//     const data = details
//     console.log(data)
//     console.log(data.user.name)
//     return (
//       <div>
//         <h1>Buyer Profile</h1>
//         <div>
//           <h2>Name: {data.user.name}</h2>
//           <h2>Email: {data.user.email}</h2>
//           <h2>Phone: {data.user.Contact}</h2>
//           <h2>Age: {data.buyer.age}</h2>
//           <h2>Batch: {data.buyer.batchName}</h2>
//         </div>
//       </div>
//     );

//   }
//   else if (details.type === "vendor")
//   {
//     const data = details
//     console.log(data.user.name)
//     console.log(data.user.email)
//     return (
//       <div>
//         <h1>Vendor Profile</h1>
//         <div>
//           <h2>Name: {data.user.name}</h2>
//           <h2>Email: {data.user.email}</h2>
//           <h2>Phone: {data.user.Contact}</h2>
//           <h2>Shopname: {data.vendor.shopname}</h2>
//           <h2>Opening Time: {data.vendor.openingtime}</h2>
//           <h2>Closing Time: {data.vendor.closingtime}</h2>
//         </div>
//       </div>
//     );
//   }

//   return
//   (
//     <div>Fuck Rp</div>
//   )
// }

export default Profile;
