"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import classes from "./MainHeader.module.css";
import NavLink from "./NavLink";

const MainHeader = () => {
    return (
        <header className="flex justify-between items-center py-8 px-4 md:px-[10%]">
            <Link
                href="/"
                className="flex items-center gap-8 text-[#ddd6cb] font-bold uppercase tracking-wider text-xl md:text-2xl"
            >
                <Image
                    alt="로고"
                    src={logo}
                    width={80}
                    height={80}
                    className={classes.logo}
                    priority
                />
                <span>NextLevel food</span>
            </Link>
            <nav className={classes.nav}>
                <ul className={classes.ul}>
                    <li className={classes.li}>
                        <NavLink href="/meals">Browse Meals</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">Foodies Community</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
