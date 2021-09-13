import { useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

const Products = ({ products, addToCart }) => {
  const [showModal, setShowModal] = useState({ product: null });

  const openModal = (product) => {
    setShowModal({ product });
  };
  const closeModal = () => {
    setShowModal({ product: null });
  };

  return (
    <div>
      <Fade bottom cascade={true}>
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id}>
                  <img
                    src={product.image}
                    alt={product.title}
                    onClick={() => openModal(product)}
                  />
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {showModal.product && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className>
              <img
                src={showModal.product.image}
                alt={showModal.product.title}
              />
              <div className="product-details-description">
                <p>
                  <strong>{showModal.product.title}</strong>
                </p>
                <p>{showModal.product.description}</p>
                <p>
                  Available Sizes:{" "}
                  {showModal.product.availableSizes.map((x) => (
                    <span>
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(showModal.product.price)}</div>
                  <button
                    className="button-primary"
                    onClick={() => {
                      addToCart(showModal.product);
                      closeModal();
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Products;
