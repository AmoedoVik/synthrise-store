import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      {/* Display the copyright information */}
      <p>2021 Synthrise Store 限定商品で All rights reserverd</p>
      {/* Display social media icons */}
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer
