import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { addCart, delCart } from "../redux/action";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Cart = () => {
  const [data, setData] = useState([]);
  const [cartDetails, setcCartDetails] = useState({
    cardid: 0,
    produtos: [],
  });
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  const cartData = useSelector((state) => state.handleCart);
  const credentialsPassable = useSelector((state) => state.checkcredential);
  console.log(credentialsPassable);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        "https://localhost:7262/api/Products/get-all"
      );
      if (componentMounted) {
        setData(await response.clone().json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://localhost:7262/api/Ccart/get-all?EmailId=${credentialsPassable.emailId}&Pw=${credentialsPassable.pw}`
      )
      .then((response) => {
        const cart = response.data;
        console.log(cart);
        setcCartDetails(cart);
        console.log(cartDetails);
        // if (response.data) {
        //   alert("Message sent");
        // } else {
        //   alert("Error occurred");
        // }
      });
    setLoading(false);
  }, []);

  console.log(cartDetails);
  const dispatch = useDispatch();
  // const [counter, setCounter] = useState(1);
  const [index, setIndex] = useState(1);

  // console.log(cartData);

  const actualprice = (p, c) => {
    return p * c;
  };

  const handleAdd = (element) => {
    console.log(element.productId);
    let productsobtained = data.filter(function (productsselected) {
      console.log(productsselected);
      return element.productId === productsselected.productId;
    });
    console.log(productsobtained[0]);

    console.log(productsobtained[0]);
    productsobtained[0].quantity = "string";
    axios
      .post("https://localhost:7262/api/Ccart/Add", {
        login: {
          emailId: credentialsPassable.emailId,
          pw: credentialsPassable.pw,
        },
        products: productsobtained[0],
      })
      .then((response) => {

        axios
          .get(
            `https://localhost:7262/api/Ccart/get-all?EmailId=${credentialsPassable.emailId}&Pw=${credentialsPassable.pw}`
          )
          .then((response) => {
            const cart = response.data;
            console.log(cart);
            setcCartDetails(cart);
            console.log(cartDetails);
            // if (response.data) {
            //   alert("Message sent");
            // } else {
            //   alert("Error occurred");
            // }
          });
      });

    dispatch(addCart(element));
  };

  const handleRemove = (element) => {
    console.log(element.productId);
    let productsobtained = data.filter(function (productsselected) {
      console.log(productsselected);
      return element.productId === productsselected.productId;
    });
    console.log(productsobtained[0]);

    console.log(productsobtained[0]);
    productsobtained[0].quantity = "string";
    axios
      .post("https://localhost:7262/api/Ccart/delete", {
        login: {
          emailId: credentialsPassable.emailId,
          pw: credentialsPassable.pw,
        },
        products: productsobtained[0],
      })
      .then((response) => {

        axios
          .get(
            `https://localhost:7262/api/Ccart/get-all?EmailId=${credentialsPassable.emailId}&Pw=${credentialsPassable.pw}`
          )
          .then((response) => {
            const cart = response.data;
            console.log(cart);
            setcCartDetails(cart);
            console.log(cartDetails);
            // if (response.data) {
            //   alert("Message sent");
            // } else {
            //   alert("Error occurred");
            // }
          });
      });

    dispatch(addCart(element));
  };

  // const Proceed = () => {
  //   return <></>;
  // };

  // const check = (c, e) => {
  //   if (c === 0) {
  //     return cartData.filter((elem) => elem.id != e.id);
  //   }
  // };

  // const changeindex = () => {
  //   setIndex(index + 1);
  // };

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };
  const ShowProducts = () => {
    console.log(cartDetails.produtos);
    return (
      <div>
        {/* <h1 className="row mx-5">Your Cart ({cartDetails.produtos.length} items) </h1> */}
        <table className="table table-bordered p-5 mx-5">
          <tr>
            <th>Item</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>

          {cartDetails.produtos.map(function (element, index) {
            if (element.quantity > 0) {
              return (
                <>
                  <br />
                  <tr>
                    <td>{index + 1}</td>
                    <td>{element.productname} </td>
                    <td> {element.productprice}</td>
                    <td>
                      <button
                        className="btn text-dark btn-secondary"
                        onClick={() => handleRemove(element)}
                      >
                        -
                      </button>
                      {element.quantity}
                      <button
                        className="btn text-dark btn-secondary"
                        onClick={() => handleAdd(element)}
                      >
                        +
                      </button>
                    </td>

                    <td>
                      {actualprice(element.productprice, element.quantity)}
                    </td>
                  </tr>
                </>
              );
            }
          })}
        </table>
        {/* {console.log(cartData)} */}

        {cartDetails.produtos.length != 0 ? (
          <>
            <NavLink
              to="/userinfo"
              className="btn btn-dark ms-2 px-3 py-2 mx-5"
            >
              Proceed to place the order
            </NavLink>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div className="row justify-content-center">
      <h1 className="row d-flex justify-content-center">YOUR CART CONTAINS ({cartDetails.produtos.length}) ITEMS</h1>
      {loading ? <Loading /> : <ShowProducts />}
    </div>
  );
};

export default Cart;
