  "use client"
  import React, { useRef } from "react";
  import Header from "components/header/header";
  import Furniture from "pages-sections/furniture-1/page-view/furniture-1";
  import Section12 from "pages-sections/furniture-1/section-12";
  import { Footer1 } from "components/footer";
  import { Navbar } from "components/navbar";
  import './app.css';
import Sticky from "components/sticky/Sticky";
import { MobileNavigationBar } from "components/mobile-navigation";

  export default function IndexPage() {

    return (
      <>
        {/* <Header /> */}
     
        <Navbar />
        <Furniture />
        <Footer1 />
      </>
    );
  }
