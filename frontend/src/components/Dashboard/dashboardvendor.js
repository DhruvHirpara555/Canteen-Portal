import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Tag, Space, InputNumber } from 'antd';
import { Rate } from 'antd';
import { Button, Modal, Form, Input} from 'antd';
// const { Column, ColumnGroup } = Table;
import { Select } from 'antd';

const { Option } = Select;



function DeleteFood(currdata) {
    console.log(currdata)
    axios.post("http://localhost:4000/dashboard/deletefood", { id: currdata }, {
        headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then((response) => {
        console.log(response)
        // window.location.reload()
    }
    ).catch((error) => {
        console.log(error)
    }
    )
}

const Fooditemslist = () => {
    const [fooditems, setFooditems] = useState([]);
    const [editflag, setEditflag] = useState(true);
    const [addfood, setAddfood] = useState(false);
    // const [sortedFooditems, setSortedFooditems] = useState([]);
    const token = sessionStorage.getItem("token")
    useEffect( () => {
        axios.get("http://localhost:4000/dashboard/", {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setFooditems(res.data);
                console.log(res.data);
                // setSortedFooditems(res.data);
                //console.log(fooditems[1]);

            }
            )
            .catch(err => {
                console.log(err);
            }
            );

    }, [editflag,addfood]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    // const onCreate = (values) => {
    //     console.log('Received values of form: ', values);
    //     setVisible(false);
    //   };
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
    };
    const handleCancel = () => {
        setIsModalVisible(false)
        form.resetFields()
    };

    const handleSubmit = (values) => {

        setIsModalVisible(false)
        console.log(values)
        axios.post("http://localhost:4000/dashboard/updatefood", values, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => {
            form.resetFields()
            console.log(res)
        }
        ).catch(err => {
            console.log(err)
        }
        )
        form.resetFields()
        setEditflag(!editflag)
        // window.location.reload()
    }
    var data = fooditems.map((fooditem, inx) => {
        return ({
            key: inx,
            id: fooditem._id,
            itemname: fooditem.itemname,
            price: fooditem.price,
            type: fooditem.type,
            tags: fooditem.tags,
            rating: fooditem.rating
        })
    })
    const [formdata, setFormdata] = useState({})
    const columns = [
        {
            title: 'Item Name',
            dataIndex: 'itemname',
            key: 'itemname',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: rating => (
                <Rate allowHalf defaultValue={rating} disabled />
            )
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
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

                    <Button onClick={() => { DeleteFood(currdata.id); setEditflag(!editflag) }}>Delete</Button>
                    <Button onClick={async () => {console.log(currdata.key);await setFormdata(currdata);console.log(formdata);showModal()}}>Edit</Button>

                </Space>


            ),
        },
    ];


    // const CollectionCreateForm = ({ visible, onCreate, onCancel,default }) => {
    //     const [form] = Form.useForm();
    //     return (
    //       <Modal
    //         visible={visible}
    //         title="Create a new collection"
    //         okText="Create"
    //         cancelText="Cancel"
    //         onCancel={onCancel}
    //         onOk={() => {
    //           form
    //             .validateFields()
    //             .then((values) => {
    //               form.resetFields();
    //               onCreate(values);
    //             })
    //             .catch((info) => {
    //               console.log('Validate Failed:', info);
    //             });
    //         }}
    //       >
    //         <Form
    //           form={form}
    //           layout="vertical"
    //           name="form_in_modal"
    //           initialValues={{
    //             modifier: 'public',
    //           }}
    //         >
    //           <Form.Item
    //             name="title"
    //             label="Title"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: 'Please input the title of collection!',
    //               },
    //             ]}
    //           >
    //             <Input />
    //           </Form.Item>
    //           <Form.Item name="description" label="Description">
    //             <Input type="textarea" />
    //           </Form.Item>
    //         </Form>
    //       </Modal>
    //     );
    //   };


    const Ok = (values) => {
        console.log('Received values of form: ', values);
        axios.post("http://localhost:4000/dashboard/addfood", values, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res)
        }
        ).catch(err => {
            console.log(err)
        }
        )
        setAddfood(false);
        form.resetFields()
    };




    return (
        <div>
            <Button onClick={() => { setAddfood(true) }}>
                Add Food
            </Button>
            <Modal visible={addfood} onOk={form.submit} onCancel={() => { {setAddfood(false);form.resetFields() }}} >
                <Form form={form} onFinish={Ok} name="fooditem" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
                    <Form.Item name="itemname"  label="Item Name" rules={[{ required: true, message: 'Please input item name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input price!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        // defaultValue = {currdata.itemname}
                        rules={[{ required: true, message: "Type  required" }]}
                    >
                        <Select >
                            <Option value="veg">Veg</Option>
                            <Option value="nonveg">Non-veg</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Tags"
                        name="tags"
                    // defaultValue = {currdata.itemname}
                    >
                        <Select
                            mode="tags"
                            allowClear
                            tokenSeparators={[',']}
                        >
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
            <Table columns={columns} dataSource={data} />
            <Modal visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                <Form
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10 }}
                    onFinish={handleSubmit}
                    initialValues={formdata}


                >
                    <Form.Item

                        label="Food Id"
                        name="id"
                        // defaultValue = {currdata.itemname}
                        //rules={[{ required: true, message: 'Item Name required' }]}
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="Item Name"
                        name="itemname"
                        // defaultValue = {currdata.itemname}
                        rules={[{ required: true, message: 'Item Name required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'price required' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        // defaultValue = {currdata.itemname}
                        rules={[{ required: true, message: "Type  required" }]}
                    >
                        <Select >
                            <Option value="veg">Veg</Option>
                            <Option value="nonveg">Non-veg</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Tags"
                        name="tags"
                    // defaultValue = {currdata.itemname}
                    >
                        <Select
                            mode="tags"
                            allowClear
                            tokenSeparators={[',']}
                        >
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )

}


export default Fooditemslist