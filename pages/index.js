import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

// This is a functional component called "Home"
// It receives two props, "products" and "bannerData"
const Home = ({ products, bannerData }) => (
  <div>
    {/* This component displays the hero banner */}
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

    {/* This div contains the heading for the product section */}
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>There are no products or services like ours. Will you miss this opportunity? You'll thank us when you see what you're really buying and hiring!</p>
    </div>

    {/* This div contains the product section */}
    <div className="products-container">
      {/* This maps over the products and displays each one */}
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    {/* This component displays the footer banner */}
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

// This function is executed on the server side
// It fetches the products and banner data from the Sanity API
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  // This returns the fetched data as props
  return {
    props: { products, bannerData }
  }
}

// This exports the Home component as the default export
export default Home;
