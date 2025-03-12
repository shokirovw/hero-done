"use client";
import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




export default function Page () {
  let [someState, setSomeState] = useState("No QR Code scanned");
  const [selectedOption, setSelectedOption] = useState("Shohjahon");
  const [scannerKey, setScannerKey] = useState(0);

  const qrScanned = (url: string) => {
    let selectedPerson = document.querySelector("#person").value;

    setSomeState("Loading...");

    if (url.startsWith("https://api.newuzbekistan.hero.study/v1/q-r/code-active?url=")) {
      if (selectedPerson == "Shohjahon" || selectedPerson == "Muhammadiyor" || selectedPerson == "Umar") {
        let req = fetch(`/sendrequest?person=${selectedPerson}&url=${url}`, {
          method: "GET"
        }).then(response => response.json()).then(json => { setSomeState(`${selectedPerson}: ${JSON.stringify(json)}`);   })


      } else {
        setSomeState("No such person");
      }
      
    } else {
      setSomeState("Qr code is not hero uzbekistan");
    }
    
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setScannerKey(prevKey => prevKey + 1); // Reset scanner
    setSomeState("No QR Code scanned");
  };

  return (
    <>
    <div className='w-96 h-96 bg-red-500 m-5'>
      <Scanner key={scannerKey} components={{ audio: false, finder: true, onOff: false, torch: false, zoom: true }} constraints={{ aspectRatio: 1, width: { max: 4096 }, height: { ideal: 4096 } }} onScan={(result) => { qrScanned(result[0].rawValue); console.log("Qr scanned function fired"); }} />
    </div>
    <div className='m-5'>
    <select id="person" value={selectedOption} onChange={handleSelectChange}>
     <option value="Shohjahon">Shohjahon</option>
     <option value="Muhammadiyor">Muhammadiyor</option>
     <option value="Umar">Umar</option>
    </select>
    <p className='mt-3'>{someState}</p>
    </div>
  </>
  )
}