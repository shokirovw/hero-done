"use client";
import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function Page () {
  let [someState, setSomeState] = useState("No Qr Code scanned")
  return (
    <>
    <div className='w-96 h-96 bg-red-500 m-5'>
      <Scanner onScan={(result) => { setSomeState(result[0].rawValue); console.log(result); }} />
    </div>
    <p>{someState}</p>
    </>
  )
}