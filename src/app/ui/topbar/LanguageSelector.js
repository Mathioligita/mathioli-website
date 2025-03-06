import React, { useState } from 'react'
import "./navbar.css"

export default function LanguageSelector() {
 const [isOpen, setIsOpen] = useState(false);


 const items = [
   { label: "Tamil" },
   { label: "English" },
 ];

  return (
    <div>


    <div className="language-selector d-flex align-items-center gap-3" onClick={() => setIsOpen(!isOpen)} >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/c4cdc30ee07044d0a85012e5629b6712/a7ae4edf6b55dfb6636f6cbabc444f9c4da08d713b46ab36274dd8da9d697feb?apiKey=c4cdc30ee07044d0a85012e5629b6712&"
        alt="Language icon"
        className="lang-icon"
      />
      <span>Lang</span>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/c4cdc30ee07044d0a85012e5629b6712/402eae727d90ef60aad5973564e8963dad5bb49095599b64715b2de608501d48?apiKey=c4cdc30ee07044d0a85012e5629b6712&"
        alt="Dropdown arrow"
        className="dropdown-arrow"
      />
      

    </div>
      {
        isOpen && (
          <div className='language-dropdown' >
            {items.map((item, index) => (
              <div key={index}>
                <span className='language-dropdown-item'>

                {item.label} 
                </span>
              {/* <hr/> */}
              </div>
            ))}

          </div>
        )
      }
    </div>
  );
}
