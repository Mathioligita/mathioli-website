import React from 'react';

const SocialIcon = ({ src, alt }) => (
  <div className="social-icon">
    <img src={src} alt={alt} className="social-icon-image" />
  </div>
);

export default SocialIcon;
