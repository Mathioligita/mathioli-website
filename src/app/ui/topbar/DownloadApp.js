import { Button } from 'primereact/button';
import React from 'react'

export default function DownloadApp() {
  return (
    <div className="download-app  ">
<div className='download-app-1'>

      <Button style={{ all: "unset" }} className='d-flex' label='' >


        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/c4cdc30ee07044d0a85012e5629b6712/60ca0e17df95a229c6956e02d41c213235ccaf2399d8d14633607c507361b7bf?apiKey=c4cdc30ee07044d0a85012e5629b6712&"
          alt="Download app icon"
          className="download-icon me-3"
        />
        <span className='download-icon-button'>Download <span>

          App
        </span></span>

      </Button>
</div>


    </div>
  );
}
