import axios from "axios";
import { useState, useEffect } from "react";

const Buyer  = () => {
    const [fooditems, setFooditems] = useState([]);
    const [available, setAvailable] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [vegfilter, setVegfilter] = useState(false);
    const [shopfilter, setShopfilter] = useState([]);
    const [tagfilter, setTagfilter] = useState([]);
    const [pricefilter, setPricefilter] = useState([0, 999999]);

    const token = sessionStorage.getItem("token")
    useEffect(() => {
        axios.get("http://localhost:4000/buyerdash/",{
        headers: {
            authorization: `Bearer ${token}`
        }}
        )
        .then(res)
    },[])
}