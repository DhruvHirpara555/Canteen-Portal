import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Tag, Space, InputNumber, Button } from 'antd';

function movetonext(orderId) {
    console.log(orderId);
    axios.post("http://localhost:4000/dashboard/order/movetonext",{
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

function rejectorder(orderid) {
    console.log(orderid);
    axios.post("http://localhost:4000/dashboard/order/reject",{
        orderId : orderid,
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

const Orderlist = () => {
    const [orders, setOrders] = useState([]);
    const [deleteflag, setDeleteflag] = useState(false);
    const [updateflag, setUpdateflag] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem("token");

    useEffect( () => {

        axios.get("http://localhost:4000/dashboard/orders", {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setOrders(res.data);
            console.log(res.data);
            setLoading(false);


        }
        )
        .catch(err => {
            console.log(err);
        }
        )


    }, [deleteflag, updateflag]);


    while(loading)
    {
        return(<div>fuck rp</div>)
    }

    // var data =  orders.map((order, inx) => {
    //     console.log(order)
    //     return (
    //         {
    //             key: inx,
    //             fooditem: order.fooditem.itemname,
    //             price: order.fooditem.price,
    //             quantity: order.quantity,
    //             status: order.status,
    //             buyer: order.buyer.name,
    //             Contact: order.buyer.Contact,
    //             placedtime: order.createdAt,
    //         })
    // })
    // console.log(data);
    // console.log(data[0].fooditem)

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
            title: "Buyer",
            dataIndex: "buyer",
            key: "buyer",
        },
        {
            title: "Contact",
            dataIndex: "Contact",
            key: "Contact",
        },
        {
            title: "Placed Time",
            dataIndex: "placedtime",
            key: "placedtime",

        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button disabled = {(record.status == "completed") || (record.status == "rejected")} onClick={() => {movetonext(record.orderId);setUpdateflag(!updateflag)}}>movetonext from {record.status}</Button>
                    <Button disabled = {(record.status == "completed") || (record.status == "rejected")} onClick={() => {rejectorder(record.orderId);setDeleteflag(!deleteflag)}}>Reject</Button>
                </Space>
            ),
        },

    ]


    return (<Table columns={columns} dataSource={orders} />)
}

export default Orderlist;

