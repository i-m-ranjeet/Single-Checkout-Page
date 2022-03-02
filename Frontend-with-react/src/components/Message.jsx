import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Message() {
    const data = useSelector(state=>state.checkout)
    const [msg,setMsg]= useState("Welcome to Single Checkout Page")
    const [cart_quantity,setCart_quantity]= useState(0)
    useEffect(() => {
      let temp = 0
      for(let i=0;i<data.cartlist.length;i++){
        temp +=data.cartlist[i].quantity
      }
      setCart_quantity(temp)
    }, [data.cartlist])
      
    useEffect(() => {
        if (data.message)
          setMsg(data.message)
    }, [data.message]);
    
  return (
        <div className="message" key={cart_quantity+data.message}>
            {msg}
        </div>
    );
}

export default Message;

    