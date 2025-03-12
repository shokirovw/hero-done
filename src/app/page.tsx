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
  const [details, setDetails] = useState("");
  const [scannerKey, setScannerKey] = useState(0);
  const [pause, setPause] = useState(false);

  const qrScanned = (url: string) => {
    let selectedPerson = document.querySelector("#person").value;

    setSomeState("Loading...");
    setDetails("");
    setPause(true);

    if (url.startsWith("https://api.newuzbekistan.hero.study/v1/q-r/code-active?url=")) {
      if (selectedPerson == "Shohjahon" || selectedPerson == "Muhammadiyor" || selectedPerson == "Umar") {
        let req = fetch(`/sendrequest?person=${selectedPerson}&url=${url}`, {
          method: "GET"
        }).then(response => response.json()).then(json => { 

          if (json.data) {
            setSomeState(`Done. #SupportUkraine`);  
          } else {
            setSomeState(`Error.`);
            if (json.error) {
              setDetails(json.error);
            } else {
              setDetails("Unknown error occurred");
            }
          }

           
        
        })


      } else {
        setSomeState("No such person");
      }
      
    } else {
      setSomeState("Qr code is not hero uzbekistan");
    }

    setPause(false);
    
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setScannerKey(prevKey => prevKey + 1); // Reset scanner
    setSomeState("No QR Code scanned");
    setDetails("");
  };

  return (
    <>
    <div className='w-96 h-96 bg-gray-600 m-5'>
      <Scanner paused={pause} key={scannerKey} components={{ audio: false, finder: true, onOff: false, torch: false, zoom: true }} constraints={{ aspectRatio: 1, width: { max: 4096 }, height: { ideal: 4096 } }} onScan={(result) => { qrScanned(result[0].rawValue); console.log("Qr scanned function fired"); }} />
    </div>
    <div className='m-5'>
    <select id="person" value={selectedOption} onChange={handleSelectChange}>
     <option value="Shohjahon">Shohjahon</option>
     <option value="Muhammadiyor">Muhammadiyor</option>
     <option value="Umar">Umar</option>
    </select>
    <p className='mt-3'>{someState}</p>
    <p className='mt-2 text-sm text-gray-500'>{details}</p>
    </div>
  </>
  )
}