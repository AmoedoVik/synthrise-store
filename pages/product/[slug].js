import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

// This is the ProductDetails component that displays the details of a product
const ProductDetails = ({ product, products }) => {
  // This extracts the image, name, details, and price of the product from the props
  const { image, name, details, price } = product;

  // This sets up the state for the index of the selected image
  const [index, setIndex] = useState(0);

  // This sets up the context for the quantity of the product in the cart
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  // This function handles the "Buy Now" button click
  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      {/* This displays the product image, small images, and details */}
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {/* This maps over the product images and displays them as small images */}
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* This displays the product name, reviews, details, price, and quantity */}
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            {/* This displays the product rating */}
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          {/* This displays the product quantity and allows the user to increase or decrease it */}
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          {/* This displays the "Add to Cart" and "Buy Now" buttons */}
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      {/* This displays other products that the user may like */}
      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
{/* This maps over the array of related products and displays them */}
{products.map((item) => (
<Product key={item._id} product={item} />
))}
</div>
</div>
</div>
</div>
)
}

// This function generates the paths that Next.js should pre-render
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  // This tells Next.js to use fallback blocking for any paths that haven't been generated yet
  return {
    paths,
    fallback: 'blocking'
  }
}

// This function fetches the data for a single product page
export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

// This exports the ProductDetails component
export default ProductDetails
