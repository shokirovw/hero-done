'use client';

import { Button } from "@/components/ui/button";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { giveImgSrcFromAvatarId } from "./giveImgSrcFromAvatarId";
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


import { create } from "zustand";
import { useUserData } from "@/lib/useUserData";
import { FaCircleCheck } from "react-icons/fa6";
import { sleep } from "@/lib/sleep";
import { MdCancel } from "react-icons/md";
import { VscJson } from "react-icons/vsc";
import { IoMdQrScanner } from "react-icons/io";

export const useScanScreenState = create((set) => ({
  open: false,
  personToScanID: null,
  openScanScreenWithPersonID: (person_id) => set((state) => ({ open: true, personToScanID: person_id })),
  close: () => set(state => ({ open: false, personToScanID: null }))
}));

export default function ScanScreen () {

    const scanScreen = useScanScreenState();
    let userdata = useUserData();

    let [isItMe, setIsItMe] = useState(false);
    let [whoIsHe, setWhoIsHe] = useState({});

    useEffect(() => {
        if (!scanScreen.personToScanID) { setIsItMe(false); }
        else {
            if (scanScreen.personToScanID == userdata.data.me.person_id) {
                setIsItMe(true);
                setWhoIsHe(userdata.data.me);
            } else {
                setIsItMe(false);
                setWhoIsHe(userdata.data.friends[scanScreen.personToScanID]);
            }
        }
    }, [scanScreen.personToScanID]);

    const [popoverOpen, setPopoverOpen] = useState(false);

    const switchPerson = (person_id) => {
        setPopoverOpen(false);
        scanScreen.openScanScreenWithPersonID(person_id);
    }

    const [scanState, setScanState] = useState({ state: 0, data: {} });

    // if url is not hero uzbekistan, just wait

    // 0 waiting for qr
    // 1 qr scanned, made a fetch, now waiting for response (popover wont open, not possible to cancel, qr scanning paused)
    // 2 response screen, either done, or error (new scan, done)


    const qrScanned = async (url: string) => {
        let personIDThatWasScanned = scanScreen.personToScanID;

        if (url.startsWith("https://api.newuzbekistan.hero.study/v1/q-r/code-active?url=")) {
            if (userdata.data.friends[personIDThatWasScanned] || userdata.data.me.person_id == personIDThatWasScanned) {
                if (scanState.state == 0) {
                    setScanState({ state: 1, data: {} });
                    let req = fetch(`/sendrequest?person_id=${personIDThatWasScanned}&url=${url}`, {
                        method: "GET"
                      }).then(response => response.json()).then(json => { 
                        if (json.data) {
                            setScanState({ state: 2, data: {
                                success: true,
                                details: {
                                    text: "Done. #SupportUkraine",
                                    returnedJSON: JSON.stringify(json)
                                }
                            } });
                        } else {
                          if (json.error) {
                            setScanState({ state: 2, data: {
                                success: false,
                                details: {
                                    text: `Error: ${json.error}`,
                                    returnedJSON: JSON.stringify(json)
                                }
                            } });
                          } else {
                            setScanState({ state: 2, data: {
                                success: false,
                                details: {
                                    text: `Unknown error occurred`,
                                    returnedJSON: JSON.stringify(json)
                                }
                            } });
                          }
                        }
                      })
                }
            }
        }
        
      }

      let [showJSON, setShowJson] = useState(false);

      const callToCloseScanScreen = () => {
        if (scanState.state != 1) {scanScreen.close(); setScanState({ state: 0, data: {} }); setIsItMe(false); setWhoIsHe({}); setShowJson(false); }
      }

      const callToNewScan = () => {
        setScanState({ state: 0, data: {} }); setShowJson(false);
      }


    return (<>
        {(scanScreen.open && userdata.data && whoIsHe.name) && (
        <Dialog open={scanScreen.open} onOpenChange={() => { callToCloseScanScreen()  }}>
            <DialogContent className="rounded-none outline-none backdrop-blur-lg px-0 py-0 min-w-full h-[100vh] border-0 bg-transparent text-white shadow-none">
                <div className="flex justify-center flex-col gap-y-7 items-center w-full h-full">
                    <DialogTitle></DialogTitle>
                    <Popover open={popoverOpen} onOpenChange={(open) => { if (scanState.state != 1) {setPopoverOpen(open);} }}>
                        <PopoverTrigger className="w-72 outline-none h-fit flex justify-between items-center px-1 pr-4 py-2 border border-gray-300/50 bg-gray-200/10 -mt-10 rounded-full">
                            <div className="h-fit flex flex-row items-center gap-x-3">
                                <Image src={giveImgSrcFromAvatarId(whoIsHe.avatar_id)} alt="" className="h-9 w-auto" width={100} />
                                <div className="text-left">
                                    <p className="font-rwdevi text-[15px] -mt-0.5 text-white">{whoIsHe.name}</p>
                                    <p className="text-xs text-gray-400">{whoIsHe.username}</p>
                                </div>
                            </div>
                            <FaAngleDown />
                        </PopoverTrigger>
                        <PopoverContent className="qrscreen-friends-select w-80 rounded-2xl p-3 px-2">
                            <div className="flex flex-col divide-y w-full max-h-[200px] overflow-y-auto overflow-x-auto divide-gray-200/70">
                            {!isItMe && (
                                <div key={-2} onClick={() => { switchPerson(userdata.data.me.person_id); }} className="flex cursor-pointer flex-row justify-between items-center py-1.5 hover:bg-gray-100 px-1.5 rounded-md">
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Image src={giveImgSrcFromAvatarId(userdata.data.me.avatar_id)} alt="" className="h-8 w-auto" width={100} />
                                        <p className="font-inter text-sm">{userdata.data.me.name}</p>
                                    </div>
                                </div>
                            )}

                            {Object.values(userdata.data.friends).map((friend, i) => {
                                if (friend.person_id != whoIsHe.person_id) {
                                    return (
                                        <div key={i} onClick={() => { switchPerson(friend.person_id); }} className="flex cursor-pointer flex-row justify-between items-center py-1.5 hover:bg-gray-100 px-1.5 rounded-md">
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
                    <div className="container relative max-w-[400px] aspect-square bg-gray-400/30 rounded-2xl">
                        {scanState.state == 2 && (
                            <div onClick={() => { setShowJson(!showJSON); }} className="absolute cursor-pointer flex items-center justify-center w-7 h-7 bg-gray-200/40 top-3 right-3 rounded-md">
                                <VscJson className="" />
                            </div>
                        )}
                        {scanState.state == 0 ? (
                            <Scanner classNames={{ container: "rounded-2xl", video: "rounded-2xl" }} key={scanScreen.personToScanID} components={{ audio: false, finder: true, onOff: false, torch: false, zoom: true }} onScan={(result) => { qrScanned(result[0].rawValue); }} />
                        ) : (
                            <>
                                {scanState.state == 1 ? (
                                    <div className="w-full h-full flex items-center justify-center flex-col gap-y-6">
                                        <AiOutlineLoading className="w-12 h-auto animate-spin" />
                                        <p className="">Loading...</p>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center flex-col">
                                    {scanState.data.success ? (
                                        <>
                                            <FaCircleCheck className="w-12 h-auto" />
                                            <p className="">{scanState.data.details.text}</p>
                                        </>
                                    ) : (
                                        <>
                                            <MdCancel className="w-16 h-auto" />
                                            {/* <p className="font-semibold text-2xl mt-2 font-poppins">{scanState.data.details.title}</p> */}
                                            <p className="text-sm mt-4 text-white/80 tracking-wide">{scanState.data.details.text}</p>
                                        </>
                                    )}
                                    {showJSON && (<p className="text-[10px] mt-3">{scanState.data.details.returnedJSON}</p>)}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {scanState.state == 0 ? (
                        <Button variant={"ghost"} onClick={() => { callToCloseScanScreen()  }} size={"sm"} className="px-14 bg-white/5 border-2 border-gray-100/5 rounded-lg">Cancel</Button>
                    ) : (
                        <>
                            {scanState.state == 1 ? (
                                <Button variant={"ghost"} size={"sm"} disabled className="px-14 bg-white/5 border-2 border-gray-100/5 rounded-lg">Loading</Button>
                            ) : (
                                <div className="flex flex-row gap-x-3">
                                    <Button variant={"secondary"} size={"sm"} className="px-6" onClick={() => { callToCloseScanScreen(); }}>Done</Button>
                                    <Button variant={"ghost"} size={"sm"} className="px-9" onClick={() => { callToNewScan() }}>New Scan <IoMdQrScanner /></Button>
                                </div>
                            )}
                        </>
                    )}
                    
                </div>
            </DialogContent>
        </Dialog>
        )}
        </>)
}