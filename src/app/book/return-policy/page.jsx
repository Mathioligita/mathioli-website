import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export const metadata = {
  title: "Tamil books buy online | Uthiradam Books",
  description:
    "Buy Tamil books online across genres like literature, spirituality, novels, and more. Enjoy easy ordering, secure payment, and doorstep delivery.",
  keywords:
    "tamil books buy online,best book shop in chennai,tamilbooks, tamil bookstore, tamil story books, tamil novels and stories, best tamil novels, best tamil books to read, tamil books to read, best books to read in tamil, Online tamil books shopping, Tamil books online, Tamil Online Book Shop, Tamil books online shopping with discount, buy Tamil ",
};

export default function PrivacyPolicy() {
  return (
    <div className="mt-4">
      <h2 className="paymentplociyheading-style">Return Policy</h2>

      <div className="container mt-4" style={{ fontFamily: "Poppins" }}>
        <p>
          At Mathioli Gita (
          <a
            href="https://www.mathioligita.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.mathioligita.com/
          </a>
          ), customer satisfaction is our priority. If you receive a book that
          is damaged, defective, or incorrect, you may request a return under
          the following conditions:
        </p>
        <ul style={{ listStyleType: "decimal", paddingLeft: "1.5rem" }}>
          <li className="d-flex">
            {" "}
            <span>
              1. Returns are accepted within 7 days from the date of delivery.
            </span>
          </li>
          <li>
            2. The book must be unused, in original condition, and with original
            packaging intact.
          </li>
          <li>3. Return requests are applicable only for:</li>
        </ul>

        <ul style={{ listStyleType: "decimal", paddingLeft: "1.5rem" }}>
          <li>1. Damaged items</li>
          <li>2. Wrong book delivered</li>
          <li>3. Printing defects (e.g., missing pages, misprints)</li>
        </ul>

        <p>
          To initiate a return, please contact us at{" "}
          <strong>
            <a href="mailto:uthiradambooks@gmail.com">
              uthiradambooks@gmail.com
            </a>
          </strong> {""}within <strong> 48 hours </strong> of receiving your order, along
          with your Order ID and photos of the issue.
        </p>

        <h6>
          <strong>Please note: </strong>
        </h6>
        <ul style={{ listStyleType: "decimal", paddingLeft: "1.5rem" }}>
          <li>
            1. Returns are not accepted for reasons such as personal preference
            or change of mind.
          </li>
          <li>
            2. Items purchased during sales or promotions are not eligible for
            return unless damaged or incorrect.
          </li>
        </ul>

        <p>
          Once your return is approved, we will guide you through the return
          process and arrange a replacement or issue a refund as applicable.
        </p>
      </div>
    </div>
  );
}
