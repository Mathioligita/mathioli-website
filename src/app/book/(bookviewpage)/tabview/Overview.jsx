import React from "react";
import "./tabview.css";
import { Col, Row } from "react-bootstrap";

export default function Overview({ books2 }) {
  //   console.log(books2, "books2");
  return (
    <div>
      <Row className="tab-overview ">
        <Col className="tab-publish ">
          Publish Date <br />
          <span style={{ color: "#F27851" }}>

          {new Date(books2?.book?.publishDate).getFullYear()}
          </span>
        </Col>
        <Col className="tab-publish">
          Publisher <br />
          <span style={{ color: "#F27851" }}>
            {books2?.book?.publisher}
          </span>{" "}
        </Col>
        <Col className="tab-publish">
          Language <br />
          <span style={{ color: "#F27851" }}>{books2?.book?.language}</span>
        </Col>
        <Col className="tab-publish">
          Pages <br />
          <span style={{ color: "#F27851" }}>{books2?.book?.pages}</span>
        </Col>
        <p></p>
      </Row>
      <Row>
        <Col>
          <div>
            <strong> Previews available in</strong> :{" "}
            <span style={{ color: "#F27851" }}>Tamil</span>
            <p className="mt-2">{books2?.book?.description}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <div className="tab-publish">
            <h5>Book Details</h5>

            <p>
              <strong>

              Published in 
              </strong>
              <br />
              <span>{books2?.book?.publisher}</span>{" "}
            </p>
            {/* <p>
              printed By
              <br />
              <span>{books2?.book?.printedBy || "no data"}</span>{" "}
            </p> */}
          </div>
        </Col>
      </Row>
    </div>
  );
}
