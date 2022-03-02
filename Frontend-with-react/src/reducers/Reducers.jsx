import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  cartlist: [],
  show_cart: "-100%",
  promotions:[],
  promoapprovel:false,
  show_promos:"-100%",
  discount:0,
  min_purchase:0,
  totalpurchase:0,
  message: "",
  // show_msg: false,
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setProducts: (state,action) => {
      state.products = action.payload
     
    },
    addToCart: (state, action) => {
      state.cartlist = []
      state.totalpurchase = 0
      for (const key in action.payload) {
        let obj ={}
        obj.course_name =key
        obj.quantity =  action.payload[key]
        state.cartlist.push(obj);
        // state.totalpurchase = state.totalpurchase + obj
    } 
    },
    setShow_cart: (state) => {
      if (state.show_cart === "0%"){
        state.show_cart = "-100%"
      }else{
        state.show_cart = "0%"
      }
    },
    setMessage:(state, action)=>{
      state.message = action.payload 
    },
    addToPromotions:(state, action)=>{
      state.promotions = action.payload.data
    },
    setShow_promos:(state)=>{
      if (state.show_promos === "-100%"){
        state.show_promos = "0"
      }else{
        state.show_promos = "-100%"
      }
    },
    setPromoapproval:(state, action)=>{
      let promo = state.promotions.filter((promo)=>promo.code === action.payload)
      state.promoapprovel = promo.length?true:false
      state.discount = promo.length?
      promo[0].discount:0
      state.min_purchase = promo.length?
      promo[0].minimum_purchase:0
      // state.message =  state.promoapprovel?state.totalpurchase>state.min_purchase?"state.message":"":""
    },

  },
})

// Action creators are generated for each case reducer function
export const { setProducts, addToCart, setShow_cart, setShow_promos, setMessage, addToPromotions, setPromoapproval } = checkoutSlice.actions

export default checkoutSlice.reducer