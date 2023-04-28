import React, { useState } from "react";
import HomeStyles from "./Home.styled";
import SimpleBlockContent from '../SimpleBlockContent';
import Head from 'next/head';
import Image from 'next/image';
import logo from "../../../public/images/logo.svg";
import Header from '../Header';

export default function Home({ 
  pageTransition,
  pageVariants,
}){

  return (
    <HomeStyles
      key="#home"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page home"
    >
			<Head>
				<title>Melbourne | Financial Times</title>
			</Head>
			<Header/>
    </HomeStyles>
  );
}
