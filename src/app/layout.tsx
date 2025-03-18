'use client';
import "./globals.css";


import { Inter, Roboto, Open_Sans, Noto_Sans, Public_Sans, Poppins } from 'next/font/google'
import localFont from 'next/font/local'

import { MdHomeFilled } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { TbMilitaryRankFilled } from "react-icons/tb";
import bush_img from "../../public/bush.jpeg"
import hero_img from "../../public/herodone.png"
import { LiaQrcodeSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";


import { Button } from "@/components/ui/button";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { giveImgSrcFromAvatarId } from "./giveImgSrcFromAvatarId";
import Image from 'next/image'

import { usePathname } from 'next/navigation'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ScanScreen, { useScanScreenState } from "./QrScanScreen";
import { useUserData } from "@/lib/useUserData";

const rwdevi = localFont({
  src: "./regular.ttf",
  display: 'swap',
  variable: "--font-rwdevi",
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ["100", "300", "400", "500", "700", "900"],
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notosans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-notosans',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const publicsans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-publicsans',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const opensans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ["300", "600", "400", "500", "700", "800"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let font_string = 
  `
    ${roboto.variable} 
    ${notosans.variable} 
    ${publicsans.variable}  
    ${opensans.variable}  
    ${inter.variable} 
    ${poppins.variable} 
    ${rwdevi.variable} 
  `

  let userdata = useUserData();
  let scanScreen = useScanScreenState();

  useEffect(() => {
    userdata.load();
  }, []);

  const toggleSearchScreen = () => {
      alert("Opening search screen");
  }

  const goToScanMe = () => {
      scanScreen.openScanScreenWithPersonID(userdata.data.me.person_id);
  }

  const pathname = usePathname()

  return (
    <html lang="en">
      <body
        className={`${font_string} antialiased`}
      >
        <ScanScreen />
        <div className="w-screen h-screen flex flex-col">
          <div className="header flex items-center justify-between h-14 py-2 px-2 sm:pl-4 sm:pr-6 pr-4">
                          <Link href={"/"} className="h-full w-fit"><Image src={hero_img} alt="" className="h-full w-auto" width={300} /></Link>
                          <div className="flex items-center gap-x-4 h-full">
                              <div onClick={() => { if (userdata.data) { goToScanMe() } }} className="flex cursor-pointer items-center gap-x-2 px-4 py-2 h-fit rounded-full bg-black text-white">
                                  {userdata.data ? (<LiaQrcodeSolid />) : (<AiOutlineLoading className="animate-spin" />)}
                              </div>
                              <Popover>
                                  <PopoverTrigger><IoMdNotificationsOutline className="w-5 h-auto" /></PopoverTrigger>
                                  <PopoverContent className="w-[200px] mr-1">
                                      <p className="text-xs leading-relaxed">You have no new notifications 🥳</p>
                                  </PopoverContent>
                              </Popover>
                              <IoIosSearch onClick={() => { toggleSearchScreen() }} className="w-5 h-auto cursor-pointer" />
                          </div>
                          {/* <p className="font-inter font-bold text-xl text-[#37b66d]">Hi Ruslan!</p> */}
                      </div>
        {children}
        <div className="px-6 sm:px-10 pt-2.5 pb-3 bg-slate-100 flex flex-row justify-between items-center">
                <BottomNavItem Icon={MdHomeFilled} str={"Home"} active={pathname == "/"} href={"/"} />
                <BottomNavItem Icon={FaUserFriends} str={"Friends"} active={pathname == "/friends"} href={"/friends"} />
                <BottomNavItem Icon={TbMilitaryRankFilled} str={"Clans"} active={pathname == "/clans"} href={"/clans"} />
                <Link href={"/profile"} className={"h-[45px] rounded-full aspect-square flex items-center justify-center" + (pathname == "/profile" && " bg-blue-200")}>
                    <div className="w-[85%] h-[85%] rounded-full">
                        <Image src={bush_img} alt="" className="w-full h-full rounded-full" width={100} />
                    </div>
                </Link>
            </div>
        </div>
      </body>
    </html>
  );
}

function BottomNavItem ({ Icon, str, active, href }) {
  return (
      <Link href={href} className="flex flex-col gap-y-[3px] group items-center">
          <div className={"py-1 px-4 rounded-full" + (active && " bg-blue-200/60")}>
              <Icon className="w-6 h-auto text-gray-700" />
          </div>
          <p className={"text-xs font-roboto text-gray-700" + (active && " font-semibold")}>{str}</p>
      </Link>
  );
}
