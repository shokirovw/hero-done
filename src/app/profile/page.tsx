'use client';

import { useEffect } from "react"

export default function Page () {
    useEffect(() => {
        console.log("hi from profile");
    }, []);

    return (
        <div className="flex-grow px-4 sm:px-6 pt-6 flex flex-col">
            <p className="text-gray-800 text-[25px] font-rwdevi">Profile</p>
        </div>
    )
}