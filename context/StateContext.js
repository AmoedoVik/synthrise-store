// Creating a context to share the state between components
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Creating a context object
const Context = createContext();

// Creating a component to wrap the application and provide the state to its children
export const StateContext = ({ children }) => {
// Initializing the state variables
const [showCart, setShowCart] = useState(false);
const [cartItems, setCartItems] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);
const [totalQuantities, setTotalQuantities] = useState(0);
const [qty, setQty] = useState(1);

let foundProduct;
let index;

// Function to add an item to the cart
const onAdd = (product, quantity) => {
// Check if the product is already in the cart
const checkProductInCart = cartItems.find((item) => item._id === product._id);
    // Updating the total price and total quantities
setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

// If the product is already in the cart, update its quantity
if(checkProductInCart) {
  const updatedCartItems = cartItems.map((cartProduct) => {
    if(cartProduct._id === product._id) return {
      ...cartProduct,
      quantity: cartProduct.quantity + quantity
    }
  })

  setCartItems(updatedCartItems);
} else {
  // If the product is not in the cart, add it to the cart
  product.quantity = quantity;
  setCartItems([...cartItems, { ...product }]);
}

// Showing a success toast notification
toast.success(`${qty} ${product.name} added to the cart.`);

  } 

  // Function to remove an item from the cart
const onRemove = (product) => {
  // Finding the product in the cart
  foundProduct = cartItems.find((item) => item._id === product._id);
  const newCartItems = cartItems.filter((item) => item._id !== product._id);
   // Updating the total price, total quantities, and cart items
setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
setCartItems(newCartItems);

  }

// Function to toggle the quantity of an item in the cart
const toggleCartItemQuanitity = (id, value) => {
  // Find the product in the cart
  foundProduct = cartItems.find((item) => item._id === id)
  index = cartItems.findIndex((product) => product._id === id);
  const newCartItems = cartItems.filter((item) => item._id !== id)

  // If the value is 'inc', increase the quantity by 1
if(value === 'inc') {
  setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
  setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
  setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
// If the value is 'dec', decrease the quantity by 1 (if greater than 1)
} else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

// Function to increment the product quantity
const incQty = () => {
  setQty((prevQty) => prevQty + 1);
  }
  
  // Function to decrement the product quantity
  const decQty = () => {
  setQty((prevQty) => {
  if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  // Providing the state values and functions to the children components
return (
  <Context.Provider
  value={{
  showCart,
  setShowCart,
  cartItems,
  totalPrice,
  totalQuantities,
  qty,
  incQty,
  decQty,
  onAdd,
  toggleCartItemQuanitity,
  onRemove,
  setCartItems,
  setTotalPrice,
  setTotalQuantities
  }}
  >
  {children}
  </Context.Provider>
  )
  }
  
  // Custom hook to use the state context
  export const useStateContext = () => useContext(Context);