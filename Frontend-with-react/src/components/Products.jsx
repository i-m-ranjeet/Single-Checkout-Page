import React from 'react'
import { useSelector } from "react-redux";
import {addToCart, setMessage} from '../reducers/Reducers'
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Products() {
    const data = useSelector((state) => state.checkout)
    const dispatch = useDispatch()

    const ToCart=(id, name)=>{
        axios.get(`http://127.0.0.1:8000/add/${id}`).then((res)=>{
            // console.log(res.data);
            dispatch(addToCart(res.data))
        })
        dispatch(setMessage(name+ " Added to Cart"))
    }
    return (
        <main className="productcontainer">
            {
                data.products.map(item=>(
                    <div key={item.id} className="product">
                        <h1 className="coursename">{item.name}</h1>
                        <h5 className="price">${item.price_p_m}</h5>
                        <h2 className="addtocart" onClick={()=>ToCart(item.id, item.name)}><span>Add to Cart</span><i className="fas fa-cart-plus"></i></h2>
                    </div>
                ))
            }
        </main>
    )
}

export default Products
