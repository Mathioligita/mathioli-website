
import Logo from '@/app/ui/topbar/Logo'
import Link from 'next/link'
import React from 'react'
import "./navbarstyles.css"

export default function Navbar() {
  return (
    <div>
      <div className="Nabar  " style={{ background: "#8080801f" }}>
        {/* <Link className="m-3 m-lg-1 link-image" href=""> */}
        <div className=" logo-images-reduces">

          <Logo />
        </div>
        {/* </Link F> */}
      </div>
    </div>
  )
}
