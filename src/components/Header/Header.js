import React, { useState } from "react";
import HeaderStyles from "./Header.styled";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import hamburger from "../../../public/images/hamburger.svg";
import search from "../../../public/images/search.svg";
import myFT from "../../../public/images/myFT.svg";

export default function Header() {
  return (
    <HeaderStyles>
      <Image priority src={logo} alt="Financial Times" className="logo" />
      <div class="nav-column">
        <Image
          priority
          src={hamburger}
          alt="Financial Times"
          className="hamburger"
        />
        <Image priority src={search} alt="Search" className="search" />
      </div>
      <Image priority src={myFT} alt="My Financial Times" className="myFT" />
    </HeaderStyles>
  );
}
