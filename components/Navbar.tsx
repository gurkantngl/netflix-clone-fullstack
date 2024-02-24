import React, { useCallback, useState }  from "react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import NavItem from "./NavItem";
import MobileMenu from "./MobileMenu";

function Navbar() {

    const [MobileMenuItem, setMobileMenu] = useState(false);
    const toogleMobileMenu = useCallback(()=>{
        setMobileMenu((current)=> !current)
    })
    return (
        <nav className="w-full fixed z-20">
            <div className="px-4 py-6 flex flex-row transition">
                <img src="/images/logo.png" className="lg:h-8 h-6"></img>
            </div>
            <div className="flex-row lg:flex hidden gap-7 ml-12">
                <NavItem name="Home" active></NavItem>
                <NavItem name="Films"></NavItem>
                <NavItem name="Series"></NavItem>
                <NavItem name="New & Popular"></NavItem>
                <NavItem name="My List" ></NavItem>
                <NavItem name="Browse My Languages" ></NavItem>

            </div>
            <div onClick={toogleMobileMenu} className="lg-hidden flex flex-row items-center gap-2 ml-6">
                <p className="text-white">Browse</p>
                <ChevronDownIcon className="text-white w-5"></ChevronDownIcon>
                <MobileMenu visible={MobileMenuItem}></MobileMenu>
            </div>
        </nav>
    )
}

export default Navbar