import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

// Functional component for the hero banner
const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        {/* Displaying the small text */}
        <p className="beats-solo">{heroBanner.smallText}</p>
        {/* Displaying the mid text */}
        <h3>{heroBanner.midText}</h3>
        {/* Displaying the large text */}
        <h1>{heroBanner.largeText1}</h1>
        {/* Displaying the hero banner image */}
        <img src={urlFor(heroBanner.image)} alt="cybergirl" className="hero-banner-image" />

        <div>
          {/* Creating a link to the product page */}
          <Link href={`/product/${heroBanner.product}`}>
            {/* Creating a button with the text provided */}
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          {/* Displaying a description */}
          <div className="desc">
            <h5> Nova Era.</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Exporting the HeroBanner component
export default HeroBanner
