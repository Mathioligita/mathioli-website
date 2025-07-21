"use client"
import React from "react";

import { usePathname } from "next/navigation";
import Footer from "../CommonPages/Footer/footer";
import Navbar from "../CommonPages/Navbar/navbar";
// import { Container, Row, Col, Card } from "react-bootstrap";

const PaymentPolicy = () => {
  const location = usePathname();
  return (
    <>
      <Navbar />
      <div className="mt-3">
        {/* <Row className="">
        <Col> */}
        <h2 className="paymentplociyheading-style">Payment Policy</h2>
        <div className="container mt-4" style={{ fontFamily: "Poppins" }}>
          <p style={{ fontFamily: "Poppins" }}>
            At <strong>Mathioli Gita</strong>
            {location === "/payment-policy" ? (
              " "
            ) : (
              (<a href="https://www.mathioligita.com/">
                https://www.mathioligita.com/
              </a>)
            )

            }
            , we strive to ensure a smooth and secure payment experience for our
            customers. This Payment Policy outlines the terms and conditions
            regarding payments on our website.
          </p>

          <h6>1. Accepted Payment Methods</h6>
          <ul>
            <li>Credit Cards (Visa, MasterCard, American Express)</li>
            <li>Debit Cards (All major banks)</li>
            <li>Net Banking</li>
            <li>UPI (Unified Payment Interface)</li>
            <li>Digital Wallets (e.g., Paytm, Google Pay, PhonePe)</li>
          </ul>

          <h6>2. Currency</h6>
          <ul>
            <li>
              All transactions on our website are processed in Indian Rupees
              (INR).
            </li>
            <li>
              For international customers, payment will be converted to INR based
              on your bank's exchange rate.
            </li>
          </ul>

          <h6>3. Secure Payment Gateway</h6>
          <ul>
            <li>
              Our website uses industry-standard SSL (Secure Socket Layer)
              encryption to protect your personal and payment information.
            </li>
            <li>
              Payments are processed through trusted and secure payment gateways
              to ensure data security.
            </li>
          </ul>

          <h6>4. Payment Confirmation</h6>
          <ul>
            <li>
              Once a payment is successfully processed, you will receive a
              confirmation email or SMS with your order details.
            </li>
            <li>
              If you do not receive a confirmation within 24 hours, please contact
              our customer support team.
            </li>
          </ul>

          <h6>5. Payment Failures</h6>
          <ul>
            <li>In case of payment failure, please ensure that you:</li>
            <ul>
              <li>Enter correct payment details.</li>
              <li>Check sufficient funds in your account.</li>
              <li>Verify the validity of your payment method.</li>
            </ul>
            <li>
              If the problem persists, contact our support team or your payment
              provider for assistance.
            </li>
          </ul>

          <h6>6. Taxes and Fees</h6>
          <ul>
            <li>
              All applicable taxes (e.g., GST) are included in the product price
              or displayed at checkout.
            </li>
            <li>
              There are no hidden charges. Any additional fees, such as shipping
              charges, will be explicitly mentioned at the time of payment.
            </li>
          </ul>

          <h6>7. Customer Support</h6>
          <p>
            For any payment-related queries, you can contact our support team:
            <br />
            📧 Email: uthiradambooks@gmail.com
            <br />
            📞 Phone: +91
            9884810585
          </p>
        </div>
        {/* </Col>
      </Row> */}
      </div>
      <Footer />
    </>
  );
};

export default PaymentPolicy;
