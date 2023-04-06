import React, { useState, useEffect } from "react";
import { addCart, delCart, currentCart } from "../redux/action";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./Navbar";

const Product = () => {
  const cartData = useSelector((state) => state.handleCart);
  const credentials = useSelector((state) => state.checkcredential);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState([]);
  const [cartDetails, setcCartDetails] = useState({
    cardid: 0,
    produtos: []
    });
  const [currentCartValues, setCurrentCartValues] = useState([]);
  const dispatch = useDispatch();
  let componentMounted = true;

  console.log(credentials)
  console.log(credentials.emailId)
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(
        "https://localhost:7262/api/Products/get-all"
      );
      if (componentMounted) {
        setData(await response.clone().json());
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
    getCartData();
  }, []);

  const getCartData = () => {
    axios
      .get(
        `https://localhost:7262/api/Ccart/get-all?EmailId=${credentials.emailId}&Pw=${credentials.pw}`
      )
      .then((response) => {
        const cart = response.data;
        console.log(cart);
        setcCartDetails(cart);
        console.log(cartDetails);
        const isThere = cart.produtos
        .some((data) => {
          return data.productID == id
        });
        setVisible(!isThere);
      });
  };

  const addProduct = async (product) => {
    const createCart = async () => {
      setLoading(true);
      const currentCart = await axios
        .post(
          "https://localhost:7262/api/Ccart/Add",
          {
            "login": {
              "emailId": credentials.emailId,
              "pw": credentials.pw
            },
            "products": product
          }
          
          // product.quantity++
        )
        .then(() => {
          getCartData();
        });
      // console.log(currentCart);
      setLoading(false);
      // setCurrentCartValues(await currentCart.json());
    };
    createCart();

    console.log(currentCartValues);
    setVisible(false);
    // dispatch(addCart(currentCartValues));
  };

  console.log(cartDetails);
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(
        `https://localhost:7262/api/Products/get-user?id=${id}`
      );
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.images}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bold">
            Rating {product.rating && product.rating}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">${product.price}</h3>
          <p className="lead">{product.descriptions}</p>
          {visible && (
            <button
              className="btn btn-outline-dark px-4 py-2"
              onClick={() => addProduct(product)}
            >
              
              Add to Cart
            </button>
          )}

          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
