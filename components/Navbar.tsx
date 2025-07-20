"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="navbar h-16 ">
      <Link href="/">
        <Image
          className="cursor-pointer"
          src="/images/logo.svg"
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
