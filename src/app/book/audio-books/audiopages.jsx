

"use client"
import React from 'react'

import Smartpage from './Audiopage';


export default function Audiopage() {
  const pathname = typeof window !== "undefined" ? window.location.pathname.split("/")[2] : null


  return (
    <div>
      <Smartpage pathname={pathname} />

    </div>
  )
}


