import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Tag, Space, InputNumber,Checkbox, Switch} from 'antd';
import { Select } from 'antd';

import { Rate } from 'antd';
import { Button, Modal, Form, Input} from 'antd';
// const { Column, ColumnGroup } = Table;

import fuzzy, { filter } from 'fuzzy'

const { Search } = Input;
const { Option } = Select;

function addfav(foodid){
    axios.post("http://localhost:4000/buyerdash/fav",{
        fooditem: foodid
    },{
    headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    })
}

const Buyer  =  () => {
    const [fooditems, setFooditems] = useState({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [vegfilter, setVegfilter] = useState(false);
    const [nonvegfilter, setNonvegfilter] = useState(false);
    const [shopfilter, setShopfilter] = useState([]);
    const [tagfilter, setTagfilter] = useState([]);
    const [pricefilter, setPricefilter] = useState([0, 999999]);
    const [favourite, setFavourite] = useState(false);
    const [favfilter, setFavfilter] = useState(false);
    const [modal, setModal] = useState(false);
    const [buyform] = Form.useForm()
    const [visible,setVisible] = useState(false);
    const [foodid,setFoodid] = useState("");


    const token = sessionStorage.getItem("token")
    useEffect(() => {
        axios.get("http://localhost:4000/buyerdash/", {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {

            setFooditems(res.data);
            setLoading(false);
        }
        )

    }
    , [favourite])



    while(loading){
        return <div>Loading...</div>
    }
    console.log(fooditems.vendors)

    const showModal = () => {
        setVisible(true);
        buyform.resetFields();
    };

    const buyfoodSubmit = (values) => {
        axios.post("http://localhost:4000/buyerdash/orderfood",{
            fooditem: foodid,
            quantity: values.quantity
        },
        {
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res => {
            console.log(res.data);

            setVisible(false);
            buyform.resetFields();
            if(res.data != "Insufficient Balance"){
                window.location.href ="/buyerorders";
            }
            else{
                alert("Insufficient Balance")
            }
        }
        )
        .catch(err => {
            console.log(err);
        }
        )


    }

    const Cancel = () => {
        setVisible(false);
        buyform.resetFields();
    };

    const onSearch = (e) => {
        setSearch(e.target.value);
    }
    const vegfilterhandler = (e) => {
         setVegfilter(e.target.checked);
         console.log(e.target.checked);


     }

     const nonvegfilterhandler = (e) => {
        setNonvegfilter(e.target.checked);
        // console.log(e.target.checked);
    }

    const handleShop = (values) => {

         setShopfilter(values)
    }

    const handleTag = (values) => {
        setTagfilter(values)
    }

    var vendors = []
    fooditems.vendors.forEach(element => {
        vendors.push(<Option key = {element}>{element}</Option>)


    });

    const MinPrice = (e) => {
        if (e.target.value.length > 0) {
            setPricefilter([e.target.value, pricefilter[1]])
        }
        else {
            setPricefilter([0, pricefilter[1]])
        }
    }
    const MaxPrice = (e) => {
        if (e.target.value.length > 0) {
            setPricefilter([pricefilter[0], e.target.value])
        }
        else {
            setPricefilter([pricefilter[0], 999999])
        }
    }

    const onChange = (e) => {
        // console.log(e);
        setFavfilter(e);
    }

    var tags = []
    fooditems.tags.forEach(element => {
        tags.push(<Option key = {element}>{element}</Option>)
    });
    console.log(vendors)


    var dataava =  fooditems.available.map((fooditem, inx) => {
        var fav = fooditems.avafav.includes(fooditem._id) ? true : false;
        return ({
            key: inx,
            id: fooditem._id,
            itemname: fooditem.itemname,
            price: fooditem.price,
            shop: fooditem.vendor.shopname,
            tag: fooditem.tags,
            type: fooditem.type,
            rating: fooditem.rating,
            favourite: fav,
        })
    })


    var dataunava = fooditems.unavailable.map((fooditem, inx) => {
        var fav = fooditems.unavafav.includes(fooditem._id);

        return ({
            key: inx,
            id: fooditem._id,
            itemname: fooditem.itemname,
            price: fooditem.price,
            shop: fooditem.vendor.shopname,
            tag: fooditem.tags,
            type: fooditem.type,
            rating: fooditem.rating,
            favourite: fav,
        })
    })


    console.log(dataunava);

    const columnsava = [
        {
            title: 'Item Name',
            dataIndex: 'itemname',
            key: 'itemname',
            onFilter: (value, record) => {

                return fuzzy.filter(value, [record.itemname]).length > 0;
            },
            filteredValue: [search],
        },
        {
            title: 'Item Name',
            dataIndex: 'shop',
            key: 'shop',
            onFilter: (value, record) => {

                if(value.length === 0) {

                    return true;
                }

                return value.includes(record.shop);
            },
            filterDropdown: (
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleShop}
                    >
                    {vendors}
                </Select>
            ),
            filteredValue: [shopfilter]
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter : (a,b) => a.price - b.price,
            onFilter : (value, record) => {
                const pricefil = value.split(',');
                return record.price >= pricefil[0] && record.price <= pricefil[1];
            },
            filteredValue: [pricefilter],
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            // filters : [
            //     {
            //         text: 'Veg',
            //         value: 'veg',
            //     },
            //     {
            //         text: 'Non-Veg',
            //         value: 'nonveg',
            //     }
            // ],
            onFilter : (value, record) => {

                if(vegfilter && nonvegfilter){
                    return record.type === 'veg' || record.type === 'nonveg';
                }
                else if(nonvegfilter){
                    return record.type === 'nonveg';
                }
                else if(vegfilter){
                    return record.type === 'veg';
                }
                else{
                    return true;
                }
            },
            filterDropdown: () => {
                return (
                    <div>
                        <Checkbox checked={vegfilter} onChange={vegfilterhandler}>Veg</Checkbox>
                        <Checkbox checked = {nonvegfilter} onChange={nonvegfilterhandler}>Non-Veg</Checkbox>
                    </div>
                )
            },
            filteredValue: [vegfilter, nonvegfilter],
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: rating => (
                <Rate allowHalf defaultValue={rating} disabled />
            ),
            sorter : (a,b) => a.rating - b.rating,
        },
        {
            title: 'Tags',
            key: 'tag',
            dataIndex: 'tag',
            onFilter: (value, record) => {
                // console.log(record);
                // console.log(value);
                if(value.length === 0) {

                    return true;
                }
                var flag = false;
                record.tag.forEach(element => {
                    if(value.includes(element)){
                        console.log(element)
                        flag = true;
                    }
                }
                )
                return flag;
                console.log("bye")

            },
            filterDropdown: (
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleTag}
                    >
                    {tags}
                </Select>
            ),
            filteredValue: [tagfilter],
            render: tags => (
                <>
                    {tags.map(tag => {
                        return (
                            <Tag color='blue' key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),


        },
        {
            title: 'Action',
            key: 'action',
            render: (text, currdata) => (

                <Space size="middle">

                    <Button onClick={()=> {addfav(currdata.id);setFavourite(!favourite)}}>{currdata.favourite ? "Unfav" : "Addtofav"}</Button>
                    <Button onClick={() => {setFoodid(currdata.id);showModal()}}>Buy</Button>
                </Space>


            ),
            onFilter : (value, record) => {
                console.log(value);
                if(value == 'true') {
                    return record.favourite;
                }
                else{
                    return true;
                }
            },
            filteredValue: [favfilter],
        },
    ];

    const columnsunava = [
        {
            title: 'Item Name',
            dataIndex: 'itemname',
            key: 'itemname',
            onFilter: (value, record) => {
                // implement fuzzy search
                return fuzzy.filter(value, [record.itemname]).length > 0;
            },
            filteredValue: [search],
        },
        {
            title: 'Item Name',
            dataIndex: 'shop',
            key: 'shop',
            onFilter: (value, record) => {
                // console.log(value)
                // console.log(record)
                if(value.length === 0) {
                    // console.log("NO")
                    return true;
                }
                console.log("hi")
                return value.includes(record.shop);
            },
            filterDropdown: (
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleShop}
                    >
                    {vendors}
                </Select>
            ),
            filteredValue: [shopfilter]
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter : (a,b) => a.price - b.price,
            onFilter : (value, record) => {
                // console.log(value)
                const pricefil = value.split(',');
                // console.log(pricefil)
                return record.price >= pricefil[0] && record.price <= pricefil[1];
            },
            filteredValue: [pricefilter],
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            // filters : [
            //     {
            //         text: 'Veg',
            //         value: 'veg',
            //     },
            //     {
            //         text: 'Non-Veg',
            //         value: 'nonveg',
            //     }
            // ],
            onFilter : (value, record) => {
                console.log(value);
                if(vegfilter && nonvegfilter){
                    return record.type === 'veg' || record.type === 'nonveg';
                }
                else if(nonvegfilter){
                    return record.type === 'nonveg';
                }
                else if(vegfilter){
                    return record.type === 'veg';
                }
                else{
                    return true;
                }
            },
            filterDropdown: () => {
                return (
                    <div>
                         <Checkbox checked={vegfilter} onChange={vegfilterhandler}>Veg</Checkbox>
                        <Checkbox checked = {nonvegfilter} onChange={nonvegfilterhandler}>Non-Veg</Checkbox>
                    </div>
                )
            },
            filteredValue: [vegfilter, nonvegfilter]

        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: rating => (
                <Rate allowHalf defaultValue={rating} disabled />
            ),
            sorter : (a,b) => a.rating - b.rating,
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tag',
            onFilter: (value, record) => {
                // console.log(record);
                // console.log(value);
                if(value.length === 0) {

                    return true;
                }
                var flag = false;
                record.tag.forEach(element => {
                    if(value.includes(element)){
                        // console.log(element)
                        flag = true;
                    }
                }
                )
                return flag;


            },
            filterDropdown: (
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleTag}
                    >
                    {tags}
                </Select>
            ),
            filteredValue: [tagfilter],
            render: tag => (
                <>
                    {tag.map(tag => {
                        return (
                            <Tag color='blue' key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, currdata) => (

                <Space size="middle">

                    <Button onClick={()=> {addfav(currdata.id);setFavourite(!favourite)}}>{currdata.favourite ? "Unfav" : "Addtofav"}</Button>
                    <Button disabled> unavailable</Button>
                </Space>



            ),
            onFilter : (value, record) => {
                // console.log(value);
                if(value == 'true'){
                    return record.favourite;
                }
                else{
                    return true;
                }
            },
            filteredValue: [favfilter],
        },
    ];

    return (
        <div>
            <Switch  onChange={onChange} >Favswitch</Switch>
            <Modal visible={visible} onOk={buyform.submit} onCancel={Cancel}>
            <Form
                form = {buyform}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                onFinish={buyfoodSubmit}

                >

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: 'Please input the quantity!' }]}
                    >
                        <InputNumber min={1} max={10} />
                    </Form.Item>

                </Form>
            </Modal>
            <Input autoFocus placeholder="Min Price"
                onChange={MinPrice}
                style={{ width: 200 }}
            ></Input>
            <Input autoFocus placeholder="Max Price"
                onChange={MaxPrice}
                style={{ width: 200 }}
            ></Input>
            <Input placeholder="SearchFood" onChange={onSearch} style={{ width: 200 }} />
            <Table columns={columnsava} dataSource={dataava} />

            <Table columns={columnsunava} dataSource={dataunava} />
        </div>
        )


    // const shopfilterhandler = (e) => {
    //     setShopfilter(e.target.value);
    // }

    // const tagfilterhandler = (e) => {
    //     setTagfilter(e.target.value);
    // }

    // const pricefilterhandler = (e) => {
    //     setPricefilter(e.target.value);
    // }

}

export default Buyer;