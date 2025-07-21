// import Head from "next/head";
// import { Button } from "primereact/button";

// export default function AboutUs() {
//   const togglebacks = () => {
//     window.location.href = "/books";
//   };
//   return (
//     <>
//       <div className="text-start">
//         <Head className="text-start">
//           <title>About Us - Mathioli Gita Books</title>
//           <meta
//             name="description"
//             content="Discover the essence of Tamil literature with Mathioli Gita Books. Explore our exclusive collection of spiritual, philosophical, and literary works."
//           />
//         </Head>

//         <div className="container text-start d-flex  mt-5">
//           <div>
//             <img src="/Assert/Frame 427325670.png" alt="" width={"500px"} />
//           </div>
//           <div className="ms-3">
//             <p
//               className="mt-3 "
//               style={{ fontWeight: "600", color: "#1D5755", fontSize: "22px" }}
//             >
//               📚 Explore. Read. Transform.
//             </p>
//             <p className="">
//               At Mathioli Gita Books, we bring the wisdom of Tamil literature to
//               your hands with an exclusive collection of books that inspire,
//               educate, and uplift. As a trusted name in Tamil publishing, we
//               specialize in spiritual, philosophical, self-improvement, and
//               literary works that cater to readers of all ages.
//             </p>
//             <p className="">
//               Our goal is to make timeless knowledge accessible to everyone.
//               Whether you are looking for thought-provoking spiritual texts,
//               motivational books, or rare literary gems, we offer a carefully
//               curated selection designed to enrich your mind and soul.
//             </p>
//             <p className="">
//               With easy online ordering and seamless delivery, Mathioli Gita
//               Books ensures that the best of Tamil literature reaches you
//               effortlessly.
//             </p>
//             <Button label="Explore Our Books" onClick={togglebacks}></Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }  
"use client";
import Head from "next/head";
import { Button } from "primereact/button";
import { Col, Row } from "react-bootstrap";
import "./AboutUs.scss";

export default function AboutUs() {
  const togglebacks = () => {
    window.location.href = "/book";
  };

  return (
    <>
      <div className="text-start">
        <Head>
          <title>About Us - Mathioli Gita Books</title>
          <meta
            name="description"
            content="Discover the essence of Tamil literature with Mathioli Gita Books. Explore our exclusive collection of spiritual, philosophical, and literary works."
          />
        </Head>

        <div className="container text-start d-flex mt-5 mb-5">
          <Row>
            <Col sm={12} md={12} lg={6}>
              <div>
                <img
                  src="/Assert/Frame 427325670.png"
                  alt=""
                  className="imag-aboursds"
                />
              </div>
            </Col>
            <Col sm={12} md={12} lg={6}>
              <div className="ms-5">
                <p
                  className="mt-3"
                  style={{
                    fontWeight: "600",
                    color: "#1D5755",
                    fontSize: "22px",
                  }}
                >
                  📚 Explore. Read. Transform.
                </p>
                <p>
                  At Mathioli Gita Books, we bring the wisdom of Tamil
                  literature to your hands with an exclusive collection of books
                  that inspire, educate, and uplift. As a trusted name in Tamil
                  publishing, we specialize in spiritual, philosophical,
                  self-improvement, and literary works that cater to readers of
                  all ages.
                </p>
                <p>
                  Our goal is to make timeless knowledge accessible to everyone.
                  Whether you are looking for thought-provoking spiritual texts,
                  motivational books, or rare literary gems, we offer a
                  carefully curated selection designed to enrich your mind and
                  soul.
                </p>
                <p>
                  With easy online ordering and seamless delivery, Mathioli Gita
                  Books ensures that the best of Tamil literature reaches you
                  effortlessly.
                </p>
                <Button
                  className="rounded-2 "
                  label="Explore Our Books"
                  style={{ background: "#1D5755" }}
                  onClick={togglebacks}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
