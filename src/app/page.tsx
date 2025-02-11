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
  let [someState, setSomeState] = useState("No Qr Code scanned");
  let [selectedPerson, setSelectedPerson] = useState("Shohjahon");

  const qrScanned = async (url: string) => {
    if (url.startsWith("https://api.newuzbekistan.hero.study/v1/q-r/code-active?url=")) {
      if (selectedPerson == "Shohjahon" || selectedPerson == "Muhammadiyor") {
        let req = fetch(`/sendrequest?person=${selectedPerson}&url=${url}`, {
          method: "GET"
        }).then(response => response.json()).then(json => { setSomeState(JSON.stringify(json)); })


      } else {
        setSomeState("No such person");
      }
      
    } else {
      setSomeState("Qr code is not hero uzbekistan");
    }
    
  }

  return (
    <>
    <div className='w-96 h-96 bg-red-500 m-5'>
      <Scanner onScan={(result) => { qrScanned(result[0].rawValue); }} />
    </div>
    <div className='m-5'>
    <Select defaultValue='Shohjahon' onValueChange={(v) => { setSelectedPerson(v); }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Oquvchi tanlang" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Shohjahon">Shohjahon</SelectItem>
        <SelectItem value="Muhammadiyor">Muhammadiyor</SelectItem>
      </SelectContent>
    </Select>
    <p className='mt-3'>{someState}</p>
    </div>
  </>
  )
}