'use client';

import { MdHomeFilled } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";
import { TbFriends, TbMilitaryRankFilled } from "react-icons/tb";

import Image from "next/image"
import bush_img from "../../public/bush.jpeg"
import hero_img from "../../public/herodone.png"
import badge_img from "../../public/badge.webp"
import badge2_img from "../../public/badge3.webp"
import { LiaQrcodeSolid } from "react-icons/lia";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { GoPin } from "react-icons/go";
import { TbPinFilled } from "react-icons/tb";
import { AiFillPushpin } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";

import { usePathname } from 'next/navigation'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

  import { Input } from "@/components/ui/input"

  import { Badge } from "@/components/ui/badge"

  import { IoCheckmark } from "react-icons/io5";

  import { FaCheck } from "react-icons/fa6";

  import { RiUnpinFill } from "react-icons/ri";
import { useEffect } from "react";
  

export default function Page () {

    const goToScan = (specific_id = "", type = "") => {
        alert("Opening scan screen");
    }

    useEffect(() => {
            console.log("hi from home");
        }, []);

    return (
            <div className="flex-grow px-4 sm:px-6 pt-6 flex flex-col">
                <p className="text-gray-800 text-[25px] font-rwdevi">Welcome aboard</p>
                <div className="flex gap-x-2.5 text-gray-500/50 mt-2.5">
                    <TbPinFilled className="w-5 h-auto" />
                    <p className="text-sm font-semibold">Pinned</p>
                </div>
                <div className="flex-grow grid grid-cols-2 xss:grid-cols-3 min-[550px]:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 grid-rows-4 gap-3 mt-4">
                    <div className="col-span-2 row-span-1 relative flex flex-col bg-gray-100 border border-gray-200 rounded-lg p-3">
                        <div className="flex-grow">
                            <div className="flex flex-row items-center gap-x-3">
                                <Image src={badge_img} alt="" className="w-9 h-auto" width={200}  />
                                <div>
                                    <p className="font-rwdevi text-[15px] -mt-0.5 text-gray-700">Me</p>
                                    <p className="text-xs text-gray-400">r.aleksanrdov@newuu.uz</p>
                                </div>
                            </div>
                        </div>
                        <TbPinFilled className="absolute text-gray-300 top-2 right-2 w-3 h-auto" />
                        <div className="w-full flex flex-row gap-x-3">
                            {/* <div className="">
                                <Button>Profile<CgProfile /></Button>
                            </div> */}
                            <Link href={"/profile"} className="flex-[3] text-xs inline-flex items-center font-medium border border-input shadow-sm h-8 rounded-md px-3 flex-row gap-x-2 bg-white hover:bg-white/80 justify-center">
                                <p>Profile</p>
                                <CgProfile />
                            </Link>
                            <div onClick={() => { goToScan("", "me") }} className="flex-[1] cursor-pointer text-[11px] items-center inline-flex font-medium border border-input shadow-sm h-8 rounded-md px-3 flex-row gap-x-2 bg-black text-white justify-center">
                                <p>Scan</p>
                                <LiaQrcodeSolid />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 flex flex-col justify-center items-center gap-y-2 bg-gray-100 rounded-lg">
                        <div className="flex flex-row justify-center">
                            <Image src={badge2_img} width={100} alt="" className="w-auto h-9" />
                        </div>
                        <p className="text-center text-xs font-inter font-semibold">Shohjahon</p>
                        <div onClick={() => { goToScan("shohjahon_id", "friend") }} className="flex flex-row gap-x-1 cursor-pointer -mt-0.5 text-xs items-center justify-center hover:bg-gray-200 py-0.5 px-1.5 rounded-xl w-fit">
                            <p>Scan</p>
                            <IoIosArrowRoundForward className="w-4 h-auto" />
                        </div>
                    </div>
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
                </div>
            </div>
    )
}

