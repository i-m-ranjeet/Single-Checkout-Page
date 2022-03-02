import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setMessage } from '../reducers/Reducers';
function Promos() {
    const dispatch = useDispatch()
    const data = useSelector((state)=>state.checkout)

    return (
    <div className='promos' style={{left: data.show_promos}}>
        <div className="promoheading">Promocodes</div>
        <table >
            <tbody>
                <tr>
                    <th>Promocode</th>
                    <th style={{background:"None"}}></th>
                    <th>Description</th>
                </tr>
                {data.promotions.map((promo)=>(
                    <tr key={promo.code}>
                        <td>{promo.code}</td>
                        <td style={{border:"None"}} onClick={()=>{navigator.clipboard.writeText(promo.code); dispatch(setMessage(`${promo.code} Copied`))}}><i className="fas fa-copy" ></i></td>
                        <td>{promo.description}</td>
                    </tr>
                    ))}
            </tbody>
        </table>
    </div>
  );
}

export default Promos;
