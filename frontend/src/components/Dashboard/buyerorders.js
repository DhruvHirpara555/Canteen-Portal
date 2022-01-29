import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Tag, Space, InputNumber, Button, Rate, Form } from 'antd';



const Buyerorder = () => {
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const [flag,setFlag] = useState(true);
    const token = sessionStorage.getItem("token");



    useEffect(() => {
        axios.get("http://localhost:4000/dashboard/orders", {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setOrders(res.data);
            // console.log(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        }
        )
    }
    , [flag])

    while(loading)
    {
        return(<div></div>)
    }

    const pickUp = (orderId) => {
        console.log(orderId);
        axios.post("http://localhost:4000/dashboard/order/pickup",{
            orderId : orderId,
        },{
            headers : {
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleChange = (id,value) => {
        console.log(id,value);
        axios.post("http://localhost:4000/buyerdash/rate",{
            orderId: id,
            rating: value
        },{
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const columns = [

        {
            title: "Food Item",
            dataIndex: 'fooditem',
            key: "fooditem",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render : status => {
                    let color = status === "placed" ? "blue" : status === "accepted" ? "green" : status === "cooking" ? "orange" : status === "ready" ? "cyan" : status === "completed" ? "green" : status === "rejected" ? "red" : "";
                    return(<Tag color={color}>{status}</Tag>)
                }
        },

        {
            title: "Shop-Name",
            dataIndex: "vendor",
            key: "vendor",
        },

        {
            title: "Placed Time",
            dataIndex: "placedtime",
            key: "placedtime",

        },
        {
            title : "Rating",
            dataIndex: 'rating',
            key : 'rating',
            render : (text,record) => {

                return(
                <Rate disabled={record.status != "completed"} defaultValue={record.rating} onChange={(value) => {handleChange(record.orderId,value);setFlag(!flag)}}/>)

            }
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={()=> {pickUp(record.orderId);setFlag(!flag)}} disabled = {(record.status != "ready") }> {record.status}</Button>
                    {/* <Button disabled = {(record.status == "completed") || (record.status == "rejected")} onClick={() => {rejectorder(record);setDeleteflag(!deleteflag)}}>Reject</Button> */}
                </Space>
            ),
        },

    ]


    return (<Table columns={columns} dataSource={orders} />)
}

export default Buyerorder;
