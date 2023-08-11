"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="fixed top-0 px-5 w-full flex justify-between">
      <Link href="/">React-Query</Link>
      <div>
        <Link className="" href="/query">
          Query
        </Link>
      </div>
    </nav>
  );
};

export default Header;
