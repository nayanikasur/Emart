import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink } from "react-router-dom";
import Pagination from "./Pagination"

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://localhost:7262/api/Products/get-all");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

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

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.categoryid === cat);
    setFilter(updatedList);
    setCurrentPage(1);
  };

  const lastPostIndex = currentPage * postsPerPage;//8
  const firstPostIndex = lastPostIndex - postsPerPage;//0
  const currentPosts = filter.slice(firstPostIndex, lastPostIndex);
  console.log(currentPosts, filter);

  const ShowProducts = () => {
    return (
      <>
        <Pagination
               
                totalPosts={filter.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("1")}
          >
            Men's Clothing{" "}
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("2")}
          >
            Women's Clothing{" "}
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("3")}
          >
            Jewelley{" "}
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("4")}
          >
            Electronics{" "}
          </button>
        </div>
        
        {currentPosts.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div class="card h-100 text-center p-4" key={product.id}>
                  <img
                    src={product.images}
                    class="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div class="card-body">
                    <h5 class="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p class="card-text lead fw-bold">${product.price}</p>
                    <NavLink
                      to={`/products/${product.productId}`}
                      class="btn btn-outline-dark"
                    >
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
