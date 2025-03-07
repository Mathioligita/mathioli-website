import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Overview from "./Overview";
import Editions from "./Editions";
import { Col, Row } from "react-bootstrap";
import Ratings from "./Ratings";
import RelatedBooks from "./relatedBooks";
export default function TabViews({ books }) {
  console.log(books, "books");
  return (
    <div>
      <TabView className="" >
        <TabPanel header="Overview">
          <Overview books2={books} />
        </TabPanel>
        <TabPanel header={`View (${books.editionCount}) Editions`}>
          <Editions books2={books} />
        </TabPanel>
        <TabPanel header="Details">
          <Row>
            <Col md={12}>
              <div className="">
                <h5> Details</h5>
                <p>
                  <strong>

                  Publish Date :
                  </strong>
                  <span className="ms-2">
                    {new Date(books?.book?.publishDate).getFullYear()}
                  </span>
                </p>
                <p>
                  <strong>

                  Author :
                  </strong>
                  <span className="ms-2">{books?.book?.author}</span>
                </p>
                <p>
                  <strong>

                  Published in
                  </strong>
                  <span className="ms-2">{books?.book?.publisher}</span>{" "}
                </p>
                <p>
                  <strong>

                  printed By :
                  </strong>
                  <span className="ms-2">
                    {books?.book?.printedBy || "no data"}
                  </span>{" "}
                </p>
                <p>
                  <strong>

                  Description :
                  </strong>
                  <span className="ms-2">{books?.book?.description}</span>
                </p>
              </div>
            </Col>
          </Row>
        </TabPanel>
        <TabPanel header={` (${books?.book?.userReadingStatus?.length}) Reviews`}>
          <Ratings books={books} />
        </TabPanel>
        {/* <TabPanel header="Lists">
          <p className="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel> */}
        <TabPanel header={`Related  Books  (${books?.relatedBookCount})`}>
          <RelatedBooks books2={books} />
        </TabPanel>
      </TabView>
    </div>
  );
}
