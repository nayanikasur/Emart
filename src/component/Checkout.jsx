import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Checkout = () => {
  const cartData = useSelector((state) => state.handleCart);
  let total=0;
  return (
    <div>
      <h1 className="row d-flex justify-content-center">BILL</h1>
      <table  className="table table-bordered p-5 mx-5">
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
        {cartData.map((element) => {
          total=total+element.price*element.qty
          return (
            <tr>
              <td> {element.title}</td>
              <td> {element.price}</td>
              <td> {element.qty}</td>
              <td> {element.price * element.qty}</td>
            </tr>
          );
        })}
      </table>
      <div className="clearfix">
        <div className="float-end mx-5">TOTAL = {total}</div>
      </div> 
      
      <NavLink to='/orderfinal' className="btn btn-dark ms-2 px-3 py-2 mx-5">Proceed to place your order </NavLink>
    </div>
  );
};

export default Checkout;
