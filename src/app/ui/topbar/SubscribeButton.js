import React from 'react'

export default function SubscribeButton() {
  return (
    <button className="subscribe-button d-flex m-2">
      <div className='subscribe-2 '> 

      <span style={{padding:`1px`}}>Subscribe <span>Now</span> </span> 
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/c4cdc30ee07044d0a85012e5629b6712/2d89ed8ef70099c5b592723c2365474a0a87d17590a550a605841cd2d32d053d?apiKey=c4cdc30ee07044d0a85012e5629b6712&"
        alt="Subscribe icon"
        className="subscribe-icon align-self-center ms-2"
        style={{ width: "16px", height: "16px" }}
      />
      </div>
     
    </button>
  );
}
