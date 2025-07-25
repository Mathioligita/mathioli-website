// "use client";
// // import Image from "next/image";
// // import Navbar from "./ui/navbar/page";
// import Bannersection from "./ui/bannersection/page";
// import Footer from "./ui/footer/Footer";
// import Topbars from "./ui/topbar/page";
// import Quote from "./book/quote/page";
// import NewArrivals from "./book/new-arrivals/page";
// import { Col, Row } from "react-bootstrap";
// import TabView from "./book/topselling/page";
// import Favoritesbooks from "./book/favoritesbooks/page";
// import Winingbooks from "./book/winningbooks/page";
// import "./globals.css";
// import TopsellingAudioBooks from "./book/topselling-audiobookspage/topselling-audiobooks";
// import { ScrollTop } from "primereact/scrolltop";
// export default function Home() {
//   return (
//     <>
//       <div className="" style={{ overflowX: "hidden" }}>
//         {/* <button className="btn btn-primary">sdsd</button> */}
//         <Topbars />

//         <Bannersection />
//         <div className="sm-ss-container">
//           <div className="ms-0 ms-md-5 p-2 p-md-0  qoute-dnakjnaajkda  me-md-5">
//             <Row className="">
//               <Col sm={12} md={12} lg={5} className="">
//                 <Quote />
//               </Col>
//               <Col sm={12} md={12} lg={7}>
//                 <NewArrivals />
//               </Col>
//             </Row>
//           </div>
//           <TabView />

//           <TopsellingAudioBooks />

//           <Favoritesbooks />
//           <Winingbooks />
//         </div>
//         <ScrollTop style={{ borderRadius: "50%", background: "#1D5755" }} />
//         <Footer />
//       </div>
//     </>
//   );
// }

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
import TopsellingAudioBooks from "./book/topselling-audiobookspage/topselling-audiobooks";
import { ScrollTop } from "primereact/scrolltop";
export const metadata = {
  title: "Buy tamil books online | Tamil Audio Books online",
  description:
    "Discover a vast collection of Tamil books online! Shop for novels, classics, spiritual books, and more. Buy now for doorstep delivery.",
  keywords:
    "buy tamil books online,tamil Audio Books online,best book shop in chennai,tamilbooks, tamil bookstore, tamil story books, tamil novels and stories, best tamil novels, best tamil books to read, tamil books to read, best books to read in tamil, Online tamil books shopping, Tamil books online, Tamil Online Book Shop, Tamil books online shopping with discount, buy Tamil books online with discount",
};
export default function Home() {
  return (
    <>
      <div className="" style={{ overflowX: "hidden" }}>
        <Topbars />
        <Bannersection />
        <div className="sm-ss-container">
          <div className="ms-0 ms-md-5 p-2 p-md-0 qoute-dnakjnaajkda me-md-5">
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
          <TopsellingAudioBooks />
          <Favoritesbooks />
          <Winingbooks />
        </div>
        <ScrollTop style={{ borderRadius: "50%", background: "#1D5755" }} />
        <Footer/>
      </div>
    </>
  );
}
