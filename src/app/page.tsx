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


const tokens = {
  "Shohjahon": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMTYyLCJpYXQiOjE3Mzg5NTIyNTcsImV4cCI6MTc0NjcyODI1N30.YhpklnsoIQ5bFi83gUqNJxiY_5gngtk-NFOo0M9OEdM",
  "Muhammadiyor": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDI0LCJpYXQiOjE3Mzg5NTAzNTMsImV4cCI6MTc0NjcyNjM1M30.JOnH1vVNkmBIScefl_JB1CIiBdn6tB13ee1Wh6Tj2ak"
}

export default function Page () {
  let [someState, setSomeState] = useState("No Qr Code scanned");
  let [selectedPerson, setSelectedPerson] = useState("Shohjahon");

  const qrScanned = async (url: string) => {
    if (url.startsWith("https://api.newuzbekistan.hero.study/v1/q-r/code-active?url=")) {
      let headers = new Headers();
      if (selectedPerson == "Shohjahon" || selectedPerson == "Muhammadiyor") {
        headers.append("Accept", "application/json, text/plain, */*");
        headers.append("Accept-Encoding", "gzip");
        headers.append("authorization", `Bearer ${tokens[selectedPerson]}`);
        headers.append("Connection", "Keep-Alive");
        headers.append("Host", "api.newuzbekistan.hero.study");
        headers.append("User-Agent", "okhttp/4.9.2");

        let req = fetch(url, {
          method: "GET",
          headers: headers,
        }).then((r) => { console.log(r); setSomeState("done"); })


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