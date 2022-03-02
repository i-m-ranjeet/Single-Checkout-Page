// import { useSelector } from "react-redux";
import Cartitems from "./Cartitems";
import Message from "./Message";
import Nav from "./Nav";
import Products from "./Products";
import Promos from "./Promos";

function Home() {
    // const data = useSelector(state=>state.show_msg)
  return (
      <>
      <Nav/>
      <Products/>
      <Cartitems/>
      <Message/>
      <Promos/>
        {/* <table>
          <tbody>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>

          </tr>
          </tbody>
          {
            count.products.map(item=>(
              <tbody key={item.id}>
              <tr >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>${item.price_p_m}</td>
              </tr>
              </tbody>
            ))
          }
        </table> */}
      </>
  );
}

export default Home;
