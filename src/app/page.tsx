'use client';

import { FaUserFriends } from "react-icons/fa";
import { TbMilitaryRankFilled } from "react-icons/tb";

import Image from "next/image"
import bush_img from "../../public/bush.jpeg"
import hero_img from "../../public/herodone.png"
import badge_img from "../../public/badge.webp"
import badge2_img from "../../public/badge3.webp"
import { LiaQrcodeSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { TbPinFilled } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"

import {
Drawer,
DrawerClose,
DrawerContent,
DrawerTrigger,
} from "@/components/ui/drawer"

import { Badge } from "@/components/ui/badge"

import { FaCheck } from "react-icons/fa6";
import { createContext, useContext, useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
  

export default function Page () {
    let [scanScreen, setScanScreen] = useState<{open: boolean; person_id: null | number;}>({
        open: false,
        person_id: null,
    });

    const openScanFor = (person_id: number) => {
        setScanScreen({ open: true, person_id: person_id });
    }

    let [friends, setFriends] = useState({
        0: { name: "Pres. Aleksandrov", email: "r.aleksandrov@newuu.uz", username: "@aleksandrov", avatar_id: 0, person_id: 0 },
        1: { name: "Shohjahon", email: "sh.karimberganov@newuu.uz", username: "@shohjahon", avatar_id: 1, person_id: 1 },
    });

    

    return (
            <div className="flex-grow px-4 sm:px-6 pt-6 flex flex-col">
                {
                    scanScreen.open && (<QrScanScreen scanScreen={scanScreen} setScanScreen={setScanScreen} friendsList={friends} />)
                }
                <p className="text-gray-800 text-[25px] font-rwdevi">Welcome aboard</p>
                <div className="flex gap-x-2.5 text-gray-500/50 mt-2.5">
                    <TbPinFilled className="w-[18px] h-auto" />
                    <p className="text-sm font-semibold">Pinned</p>
                </div>
                <div className="flex-grow grid grid-cols-2 xss:grid-cols-3 min-[550px]:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 grid-rows-4 gap-3 mt-4">
                    
                    <div className="col-span-2 row-span-1 relative flex flex-col bg-gray-100 border border-gray-200 rounded-lg p-3">
                        <div className="flex-grow">
                            <div className="flex flex-row items-center gap-x-3">
                                <Image src={giveImgSrcFromAvatarId(friends[0].avatar_id)} alt="" className="w-9 h-auto" width={200}  />
                                <div>
                                    <p className="font-rwdevi text-[15px] -mt-0.5 text-gray-700">{friends[0].name}</p>
                                    <p className="text-xs text-gray-400">{friends[0].email}</p>
                                </div>
                            </div>
                        </div>
                        <TbPinFilled className="absolute text-gray-300 top-2 right-2 w-3 h-auto" />
                        <div className="w-full flex flex-row gap-x-3">
                            <Link href={"tel:990000011"} className="flex-[3] text-xs inline-flex items-center font-medium border border-input shadow-sm h-8 rounded-md px-3 flex-row gap-x-2 bg-white hover:bg-white/80 justify-center">
                                <p>Contact</p>
                                <IoIosCall />
                            </Link>
                            <div onClick={() => { openScanFor(friends[0].person_id); }} className="flex-[1] cursor-pointer text-[11px] items-center inline-flex font-medium border border-input shadow-sm h-8 rounded-md px-3 flex-row gap-x-2 bg-black text-white justify-center">
                                <p>Scan</p>
                                <LiaQrcodeSolid />
                            </div>
                        </div>
                    </div>

                    {Object.values(friends).slice(1).map((person, i) => (
                        <div key={i} className="col-span-1 row-span-1 flex flex-col justify-center items-center gap-y-2 bg-gray-100 rounded-lg">
                            <div className="flex flex-row justify-center">
                                <Image src={giveImgSrcFromAvatarId(person.avatar_id)} width={100} alt="" className="w-auto h-9" />
                            </div>
                            <p className="text-center text-xs font-inter font-semibold">{person.name}</p>
                            <div onClick={() => { openScanFor(person.person_id); }} className="flex flex-row gap-x-1 cursor-pointer -mt-0.5 text-xs items-center justify-center hover:bg-gray-200 py-0.5 px-1.5 rounded-xl w-fit">
                                <p>Scan</p>
                                <IoIosArrowRoundForward className="w-4 h-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}

function giveImgSrcFromAvatarId (avatar_id: number) {
    if (avatar_id == 0) {
        return badge_img;
    } else {
        return badge2_img;
    }
}

function QrScanScreen ({ scanScreen, setScanScreen, friendsList }) {
    const [pause, setPause] = useState(false);
    const [scanState, setScanState] = useState(0);
    // 0 default
    // 1 loading
    // 2 result
    
    //   const qrScanned = (url: string) => {
    //     let selectedPerson = document.querySelector("#person").value;
    
    //     setSomeState("Loading...");
    //     setDetails("");
    //     setPause(true);
    
    //     if (url.startsWith("https://api.newuzbekistan.hero.study/v1/q-r/code-active?url=")) {
    //       if (selectedPerson == "Shohjahon" || selectedPerson == "Muhammadiyor" || selectedPerson == "Umar") {
    //         let req = fetch(`/sendrequest?person=${selectedPerson}&url=${url}`, {
    //           method: "GET"
    //         }).then(response => response.json()).then(json => { 
    
    //           if (json.data) {
    //             setSomeState(`Done. #SupportUkraine`);  
    //           } else {
    //             setSomeState(`Error.`);
    //             if (json.error) {
    //               setDetails(json.error);
    //             } else {
    //               setDetails("Unknown error occurred");
    //             }
    //           }
    
               
            
    //         })
    
    
    //       } else {
    //         setSomeState("No such person");
    //       }
          
    //     } else {
    //       setSomeState("Qr code is not hero uzbekistan");
    //     }
    
    //     setPause(false);
        
    //   }

    return (
        <Dialog open={scanScreen.open} onOpenChange={(open) => { setScanScreen({ ...scanScreen, open: open }) }}>
            <DialogContent className="rounded-none outline-none backdrop-blur-lg px-0 py-0 min-w-full h-[100vh] border-0 bg-transparent text-white shadow-none">
                <div className="flex justify-center flex-col gap-y-7 items-center w-full h-full">
                    <DialogTitle></DialogTitle>
                    <Popover>
                            <PopoverTrigger className="w-72 outline-none h-fit flex justify-between items-center px-1 pr-4 py-2 border border-gray-300/50 bg-gray-200/10 -mt-10 rounded-full">
                                <div className="h-fit flex flex-row items-center gap-x-3">
                                    <Image src={giveImgSrcFromAvatarId(friendsList[scanScreen.person_id].avatar_id)} alt="" className="h-9 w-auto" width={100} />
                                    <div className="text-left">
                                        <p className="font-rwdevi text-[15px] -mt-0.5 text-white">{friendsList[scanScreen.person_id].name}</p>
                                        <p className="text-xs text-gray-400">{friendsList[scanScreen.person_id].username}</p>
                                    </div>
                                </div>
                                <FaAngleDown />
                            </PopoverTrigger>
                            <PopoverContent className="qrscreen-friends-select w-80 rounded-2xl p-3 px-2">
                                <div className="flex flex-col divide-y w-full max-h-[200px] overflow-y-auto overflow-x-auto divide-gray-200/70">
                                {Object.values(friendsList).map((friend, i) => {
                                    if (friend.person_id != scanScreen.person_id) {
                                        return (
                                            <div key={i} className="flex cursor-pointer flex-row justify-between items-center py-1.5 hover:bg-gray-100 px-1.5 rounded-md">
                                                <div className="flex flex-row items-center gap-x-2">
                                                    <Image src={giveImgSrcFromAvatarId(friend.avatar_id)} alt="" className="h-8 w-auto" width={100} />
                                                    <p className="font-inter text-sm">{friend.name}</p>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (<div key={i} className="hidden"></div>)
                                    }
                                })}
                                </div>
                            </PopoverContent>
                    </Popover>
                    <div className="container max-w-[400px] aspect-square bg-gray-400/30 rounded-2xl">
                        {true ? (
                            <Scanner classNames={{ container: "rounded-2xl", video: "rounded-2xl" }} paused={pause} key={scanScreen.person_id} components={{ audio: false, finder: true, onOff: false, torch: false, zoom: true }} onScan={(result) => { qrScanned(result[0].rawValue); console.log("Qr scanned function fired"); }} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center flex-col gap-y-6"> {/*bg-blue-500*/}
                                <AiOutlineLoading className="w-12 h-auto animate-spin" />
                                <p className="">Loading...</p>
                            </div>
                        )}
                    </div>
                    <Button variant={"ghost"} onClick={() => { setScanScreen({ ...scanScreen, open: false }) }} size={"sm"} className="px-14 bg-white/5 border-2 border-gray-100/5 rounded-lg">Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function AddPinnedGridItem () {
    return (
        <Drawer>
                    <DrawerTrigger className="col-span-1 row-span-1">
                        <div className="w-full h-full cursor-pointer hover:bg-gray-200/60  text-gray-400 px-3 flex flex-col items-center justify-center gap-y-2 bg-gray-100 rounded-lg">
                            <IoAdd className="w-6 h-auto mt-1" />
                            <p className="text-xs text-center">Pin a friend or clan</p>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent aria-describedby="" aria-description="">
                        <DialogTitle></DialogTitle>
                        <div className="py-4 px-4 pb-6 w-full">
                            <p className="font-inter">Choose your friend or clan</p>
                            <div className="flex flex-row-2 gap-x-3">
                                <Badge variant="default" className="mt-2 gap-x-2"><FaCheck />Friends</Badge>
                                <Badge variant="default" className="mt-2 gap-x-2"><FaCheck />Clans</Badge>
                                <Badge variant="outline" className="mt-2 gap-x-2"><IoIosSearch />Search</Badge>
                            </div>
                            <div className="grid grid-cols-1 border-b divide-y mt-4">
                                <div className="col-span-1 hover:bg-gray-100 px-1  py-3 flex flex-row justify-between">
                                    <div className="flex flex-row items-center gap-x-3">
                                        <Image src={badge2_img} alt="" className="h-7 w-auto" width={300} />
                                        <p className="text-sm font-medium font-roboto">Shuhrat</p>
                                        <FaUserFriends className="text-gray-800" />
                                    </div>   
                                </div>
                                <div className="col-span-1 hover:bg-gray-100 px-1  py-3 flex flex-row justify-between">
                                    <div className="flex flex-row items-center gap-x-3">
                                        <Image src={badge_img} alt="" className="h-7 w-auto" width={300} />
                                        <p className="text-sm font-medium font-roboto">Zafar</p>
                                        <FaUserFriends className="text-gray-800" />
                                    </div>
                                </div>
                                <div className="col-span-1 hover:bg-gray-100 px-1 py-3 flex flex-row justify-between">
                                    <div className="flex flex-row items-center gap-x-3">
                                        <Image src={bush_img} alt="" className="h-7 w-auto rounded-full" width={300} />
                                        <p className="text-sm font-medium font-roboto">Team Ruslan</p>
                                        <TbMilitaryRankFilled className="text-gray-800" />
                                    </div>
                                    <div className="text-gray-600 flex gap-x-2 items-center">
                                        <TbPinFilled className="w-4  h-auto" />
                                    </div>
                                </div>
                            </div>
                            <DrawerClose asChild>
                                <Button size={"sm"} className="mt-10 w-full">Done</Button>
                            </DrawerClose>
                            {/* <Input placeholder="Search" className="text-sm " /> */}
                        </div>
                    </DrawerContent>
                    </Drawer>
    );
}

