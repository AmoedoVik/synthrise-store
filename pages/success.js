import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

// This is a functional component called "Success"
const Success = () => {
  // This extracts the cart items, total price, and total quantities from the global state
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  // This hook runs once when the component is mounted
  useEffect(() => {
    // This clears the cart items from local storage and sets the cart items, total price, and total quantities to their initial values
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);

    // This runs the fireworks animation
    runFireworks();
  }, []);

  // This renders the success message
  return (
    <div className="success-wrapper">
      <div className="success">
        {/* This displays the success icon */}
        <p className="icon">
          <BsBagCheckFill />
        </p>

        {/* This displays the success message */}
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>

        {/* This displays the email address for customer support */}
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto: amoedovicc@gmail.com">
          amoedovicc@gmail.com
                    </a>
        </p>

        {/* This displays the "continue shopping" button */}
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

// This exports the Success component as the default export
export default Success;
