import { useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

const Cart = ({ cartItems, removeFromCart, createOrder }) => {
  const [showCheckout, setShowCheckout] = useState("false");
  const [userData, setUserData] = useState({});

  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const createOrderHandler = (e) => {
    e.preventDefault();
    createOrder(userData);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty </div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} in the cart
        </div>
      )}
      <div className="cart">
        <Fade left cascade>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button
                      className="button"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
      </div>
      {cartItems.length !== 0 && (
        <div>
          <div className="cart">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                onClick={() => setShowCheckout("true")}
                className="button primary"
              >
                Proceed
              </button>
            </div>
          </div>
          {showCheckout && (
            <Fade right cascade>
              <div className="cart">
                <form onSubmit={createOrderHandler}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <label> Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        name="address"
                        type="text"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </Fade>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
