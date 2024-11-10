"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./NavLink.module.css";

const NavLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    const path = usePathname();
    return (
        <Link
            href={href}
            className={path.startsWith(href) ? classes.active : undefined}
        >
            {children}
        </Link>
    );
};

export default NavLink;
