import React, { useState } from "react";
import HeaderStyles from "./Header.styled";
import Image from 'next/image';
import logo from "../../../public/images/logo.svg";

export default function Header() {
  return (
    <HeaderStyles>
			<Image
				priority
				src={logo}
				alt="Financial Times"
				className="logo"
			/>
    </HeaderStyles>
  );
}
