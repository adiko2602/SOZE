import React from "react";
import Menu from "./Menu";
import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";

function Header() {
  return (
    <div className="flex min-w-screen p-8 justify-between items-center border-b">
      <Logo />
      <Menu />
    </div>
  );
}

export default Header;
