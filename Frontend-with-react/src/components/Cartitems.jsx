import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addToCart, setMessage, setPromoapproval } from '../reducers/Reducers'
function Cartitems() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.checkout)
    const [promo, setPromo] = useState(false)
    const [whichpromo, setWhichpromo] = useState("")
    const [rej, setRej] = useState({ color: "rgb(230, 33, 33)", opacity: "0" })
    const [totalcalculated, setTotalcalculated] = useState(0)
    const [cart_quantity, setCart_quantity] = useState(0)
    const [required, setRequired] = useState(false)

    const removeFromCart = (name) => {
        axios.get(`http://127.0.0.1:8000/remove/${name}`).then((res) => {
            // console.log(res.data);
            dispatch(addToCart(res.data))
        })
        dispatch(setMessage(name + " Removed from Cart"))
    }
    const deleteFromCart = (name) => {
        axios.get(`http://127.0.0.1:8000/delete/${name}`).then((res) => {
            // console.log(res.data);
            dispatch(addToCart(res.data))
        })
        dispatch(setMessage(name + " Removed from Cart"))

    }
    const ToCart = (id, name) => {
        axios.get(`http://127.0.0.1:8000/add/${id}`).then((res) => {
            dispatch(addToCart(res.data))
        })
        dispatch(setMessage(name + " Added to Cart"))
    }

    const Promo = (e) => {
        setWhichpromo(e.target.value)
    }
    const promoApplied = () => {
        dispatch(setPromoapproval(whichpromo))
        setRej({ color: "rgb(230, 33, 33)", opacity: "1" })
    }
    useEffect(() => {
        let total = 0
        data.cartlist.map((cartitem) => {
            total += data.products.filter(product => product.name === cartitem.course_name)[0].price_p_m * cartitem.quantity
        })
        setTotalcalculated(total)

    }, [cart_quantity]);
    useEffect(() => {
        let temp = 0
        for (let i = 0; i < data.cartlist.length; i++) {
            temp += data.cartlist[i].quantity
        }
        setCart_quantity(temp)
    }, [data.cartlist])


    return (
        <div className='cartholder' style={{ right: data.show_cart }}>
            <div className='cartitems'>
                {data.cartlist.length ? <h1 className='cartheading'>Your Cart</h1> : <h1 className='cartheading empty'>Your Cart</h1>}
                {data.cartlist.length ? <div className='productdata'>
                    <div>Product</div>
                    <div>Quantity</div>
                    <div>Price</div>
                    <div>Amount</div>

                </div> : ""}
                {
                    data.cartlist.length ? data.cartlist.map(item => (
                        <div className='cartitem' key={item.course_name}>
                            <div className='add_removebtn' onClick={() => deleteFromCart(item.course_name)}><i className="far fa-trash-alt"></i></div>
                            <div style={{fontWeight:"900"}}>{item.course_name}</div>
                            <div className='quantity'>
                                {item.quantity < 2 ? <div onClick={() => removeFromCart(item.course_name)}><i className="far fa-trash-alt"></i></div> : <div onClick={() => removeFromCart(item.course_name)}><i className="fas fa-minus-square"></i></div>}
                                <div className='quantitycounter'>{item.quantity}</div>
                                <div onClick={() => ToCart(Number(item.course_name[item.course_name.length - 1]), item.course_name)}><i className="fas fa-plus-square"></i></div>
                            </div>
                            <div className='price'>${data.products.filter(product => product.name === item.course_name)[0].price_p_m}</div>
                            <div className='amount'>${(data.products.filter(product => product.name === item.course_name)[0].price_p_m * item.quantity).toFixed(2)}</div>
                        </div>
                    )) : <div className='emptycart'>Empty</div>
                }
                {
                    data.cartlist.length ? <div className="promosec">
                        <div>
                            {promo ? <div className='promo'>
                                <input type="text" name="" id="" value={whichpromo} className='promofield' placeholder='Enter your promo here...' onChange={Promo} />
                                <i className="fas fa-clone applypromo" style={{ padding: "5px 10px ", }} onClick={() => navigator.clipboard.readText().then(copied => setWhichpromo(copied))}></i>
                                <div className='applypromo' onClick={promoApplied}>Apply</div>
                                {data.promoapprovel ? totalcalculated.toFixed(2) > data.min_purchase ? <div className='promostatus' style={{ color: "rgb(43, 131, 77)" }}>applied... &#10004;</div> :
                                    <div className='promostatus' style={rej}>This code is for orders above ${data.min_purchase} </div> :
                                    <div className='promostatus' style={rej}>enter valid promo... &#10007;</div>}
                            </div> : <div onClick={() => setPromo(true)} className="havepromo">Have a promocode</div>}
                        </div>
                    </div> : ""
                }
                {
                    data.cartlist.length ? <div className="totalsec">
                        <table >
                            <tbody>
                                {/* {totalcalculated.toFixed(2) > data.min_purchase ? <tr>
                                {data.promoapprovel ? <><td> Promocode Applied for Discount</td><td> {data.discount}%</td></> : ""}
                            </tr> : ""} */}
                                {
                                    totalcalculated.toFixed(2) > data.min_purchase ? data.promoapprovel ? <tr><td> Promocode Applied for Discount</td><td> {data.discount}%</td> </tr> : "" : ""
                                }
                                {/* {totalcalculated.toFixed(2) > data.min_purchase ? <tr>
                                {data.promoapprovel ? <><td>Discount</td><td> ${(totalcalculated / 100 * data.discount).toFixed(2)}</td></> : ""}
                            </tr> : ""} */}
                                {
                                    totalcalculated.toFixed(2) > data.min_purchase ? data.promoapprovel ? <tr><td>Total Amount</td><td>${(totalcalculated).toFixed(2)}</td></tr> : "" : ""
                                }
                                {
                                    totalcalculated.toFixed(2) > data.min_purchase ? data.promoapprovel ? <tr><td>Discount</td><td>${(totalcalculated / 100 * data.discount).toFixed(2)}</td></tr> : "" : ""
                                }
                                <tr>
                                    <td>Amount to Pay  </td>
                                    <td style={{ color: "#FFF" }}>{data.promoapprovel && totalcalculated.toFixed(2) > data.min_purchase ? (<>${(totalcalculated.toFixed(2) - (totalcalculated / 100 * data.discount).toFixed(2)).toFixed(2)}</>) : <>${totalcalculated.toFixed(2)}</>}</td>
                                </tr>
                                <tr><td style={{ border: "None" }}><div className="checkout" >proceed to check out</div></td></tr>
                            </tbody>
                        </table>
                    </div> : ""
                }
            </div>
        </div>
    )
}

export default Cartitems
