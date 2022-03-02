import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShow_cart, setShow_promos } from '../reducers/Reducers';
function Nav() {
  // const [animate,setAnimate]=useState({animation:"cartitems .2s linear forwards"})
  const data = useSelector((state) => state.checkout)
  const dispatch = useDispatch()
  const [cart_quantity,setCart_quantity]= useState(0)

useEffect(() => {
  let temp = 0
  for(let i=0;i<data.cartlist.length;i++){
    temp +=data.cartlist[i].quantity
  }
  setCart_quantity(temp)
}, [data.cartlist])
  return (
  <>
    <nav className="navbar">
      <h1 className="checkoutheading">
         <div>Single Checkout Page</div>
         <i class="fas fa-money-check-alt"></i></h1>
      <ul className="navlist">
        <li className="promocodes" onClick={()=>dispatch(setShow_promos())}>Promo Codes</li>
        <li className="cart" onClick={()=>dispatch(setShow_cart())}>
          <i className="fas fa-shopping-cart"></i>
  <div className="itemsquantity" key={cart_quantity}>{cart_quantity?cart_quantity:"+"}</div>
        </li>
      </ul>
    </nav>        
  </>
  );
}

export default Nav;
