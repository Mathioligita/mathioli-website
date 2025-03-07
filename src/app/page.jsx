"use client";
// import Image from "next/image";
// import Navbar from "./ui/navbar/page";
import Bannersection from "./ui/bannersection/page";
import Footer from "./ui/footer/Footer";
import Topbars from "./ui/topbar/page";
import Quote from "./book/quote/page";
import NewArrivals from "./book/new-arrivals/page";
import { Col, Row } from "react-bootstrap";
import TabView from "./book/topselling/page";
import Favoritesbooks from "./book/favoritesbooks/page";
import Winingbooks from "./book/winningbooks/page";
import "./globals.css";
export default function Home() {
  return (
    <>
      <div className="">
        {/* <button className="btn btn-primary">sdsd</button> */}
        <Topbars />
        <Bannersection />
        <div className="ms-0 ms-md-5 p-2 p-md-0 mt-5  me-md-5">
          <Row className="">
            <Col sm={12} md={12} lg={5} className="">
              <Quote />
            </Col>
            <Col sm={12} md={12} lg={7}>
              <NewArrivals />
            </Col>
          </Row>
        </div>
        <TabView />

        <Favoritesbooks />
        <Winingbooks />

        <Footer />
      </div>
    </>
  );
}
