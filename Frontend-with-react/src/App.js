import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import Home from './components/Home'
import {useDispatch } from 'react-redux'
import { setProducts, addToCart, addToPromotions } from './reducers/Reducers'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/products').then(res => {
      dispatch(setProducts(res.data.data))
    })
    axios.get(`http://127.0.0.1:8000/all`).then((res) => {
      // console.log(res.data);
      dispatch(addToCart(res.data))
    })
    axios.get(`http://127.0.0.1:8000/promos`).then((res) => {
      // console.log(res.data);
      dispatch(addToPromotions(res.data))
    })
  })
  return (
    <>
      <Home />
    </>
  );
}

export default App;
