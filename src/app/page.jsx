"use client";
import IndexPageView from "pages-sections/landing/page-view";
import Header from "components/header/header";
import Furniture from "pages-sections/furniture-1/page-view/furniture-1";
import Furniture2 from "pages-sections/furniture-2/page-view/furniture-2";
import { Footer1, Footer2, Footer3, Footer4 } from "components/footer";
import { useEffect, useState } from "react";
import { Navbar } from "components/navbar";
import Section12 from "pages-sections/furniture-1/section-12";
import './app.css';

export default function IndexPage() {

    return (
    <>
      <Header />
      <Navbar />
      <Furniture  />
      <Section12 id="contact"></Section12>
      <Footer1 />
    </>
  );
}
