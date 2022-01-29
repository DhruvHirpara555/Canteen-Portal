import axios from "axios";
import { useState, useEffect } from "react";

const Stats  = () => {
    const [topfive,setTopfive] = useState([]);
    const [loading,setLoading] = useState(true);
    const [orderstats,setOrderstats] = useState({});

    var top = [];
    var orders = {};

    useEffect(async () => {
        top = await axios.get("http://localhost:4000/stats/top",{
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })

        orders = await axios.get("http://localhost:4000/stats/orderstats",{
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })

        setTopfive(top.data);
        setOrderstats(orders.data);
        setLoading(false);

    }

    ,[])

    while(loading)
    {
        return(<div></div>)
    }

    return(
        <div>
            <h1>
                Top 5 ordered food items
            </h1>
            <list>
                {
                    topfive.map(item => {
                        return(
                            <li>
                                {item.itemname} - {item.total}
                            </li>
                        )
                    })
                }
            </list>
            <h1>
                Order statistics
            </h1>
            <div>
                <h3>
                    Total orders : {orderstats.total}
                </h3>
                <h3>
                    Pending : {orderstats.pendingordercount}
                </h3>
                <h3>
                    Placed : {orderstats.placedordercount}
                </h3>
                <h3>
                    completed : {orderstats.completedordercount}
                </h3>
                <h3>
                    Rejected : {orderstats.rejectedordercount}
                </h3>
            </div>
        </div>
    )
}

export default Stats;