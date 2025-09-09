"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../CommonPages/Navbar/navbar";
import Footer from "../CommonPages/Footer/footer";
import { usePathname } from "next/navigation";

export default function TermsAndConditions() {
  const location = usePathname();
  return (
    <>
      <Navbar />
      <div className="mt-4">
        <h2 className="paymentplociyheading-style">Terms and Conditions</h2>
        <div className="container mt-4" style={{ fontFamily: "Poppins" }}>
          <p>
            Welcome to Mathioli Gita.
            {location === "/terms-and-conditions" ? (
              " "
            ) : (
              <a
                href="https://www.mathioligita.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.mathioligita.com/
              </a>
            )}
            These Terms and Conditions govern your use of our website, including
            browsing, purchasing products, and interacting with our services. By
            accessing or using our website, you agree to be bound by these
            terms. Please read them carefully.
          </p>

          <h6>1. General Terms</h6>
          <ul>
            <li>
              By using this website, you confirm that you are at least 18 years
              of age or accessing the website under the supervision of a parent
              or guardian.
            </li>
            <li>
              The content, products, and services provided on this website are
              for personal, non-commercial use only.
            </li>
            <li>
              We reserve the right to modify these Terms and Conditions at any
              time without prior notice. It is your responsibility to review
              them periodically.
            </li>
          </ul>

          <h6>2. Product Information and Pricing</h6>
          <ul>
            <li>
              We strive to ensure that all product descriptions, images, and
              prices are accurate. However, errors may occur, and we reserve the
              right to correct them without prior notice.
            </li>
            <li>
              Prices listed on the website are in Indian Rupees (INR) unless
              stated otherwise. Applicable taxes and shipping charges will be
              added at checkout.
            </li>
            <li>
              All products are subject to availability. In the event a product
              is out of stock, we will notify you and provide alternatives or a
              refund.
            </li>
          </ul>

          <h6>3. Orders and Payments</h6>
          <ul>
            <li>
              Placing an order on our website constitutes an offer to purchase.
              We reserve the right to accept or decline your order at our sole
              discretion.
            </li>
            <li>
              Payment must be made in full at the time of order placement. We
              accept payments through secure payment gateways.
            </li>
            <li>
              In case of payment failure, the order will not be processed.
            </li>
          </ul>

          <h6>4. Shipping and Delivery</h6>
          <ul>
            <li>
              We aim to dispatch orders within the estimated time frame
              mentioned on the website. However, delays may occur due to
              unforeseen circumstances.
            </li>
            <li>
              Shipping costs will be calculated at checkout based on your
              location and order size.
            </li>
            <li>
              Once an order is dispatched, we are not liable for delays caused
              by courier services.
            </li>
          </ul>

          <h6>5. Cancellation, Returns, and Refunds</h6>
          <ul>
            <li>
              Orders can be canceled before they are dispatched by contacting
              our customer support team.
            </li>
            <li>
              Products can be returned only if they are damaged, defective, or
              incorrect. Returns must be requested within [Insert Return Period]
              days of delivery.
            </li>
            <li>
              Refunds will be processed for eligible returns within [Insert
              Refund Timeframe] days. The amount will be credited to the
              original payment method.
            </li>
          </ul>

          <h6>6. Intellectual Property</h6>
          <ul>
            <li>
              All content on the website, including text, images, logos, and
              designs, is the intellectual property of Mathioli Gita.
            </li>
            <li>
              You may not reproduce, distribute, or use any content from our
              website without prior written consent.
            </li>
          </ul>

          <h6>7. User Conduct</h6>
          <ul>
            <li>
              You agree not to use the website for any unlawful purpose or to
              violate any applicable laws.
            </li>
            <li>
              You may not attempt to interfere with the website’s functionality,
              compromise its security, or misuse its features.
            </li>
          </ul>

          <h6>8. Limitation of Liability</h6>
          <ul>
            <li>
              Mathioli Gita is not liable for any direct, indirect, incidental,
              or consequential damages arising from the use or inability to use
              the website.
            </li>
            <li>
              We are not responsible for any technical issues, errors, or
              interruptions that may affect your access to the website.
            </li>
          </ul>

          <h6>9. Contact Us</h6>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us:
          </p>
          <p>📧 Email: uthiradambooks@gmail.com</p>
          <p>📞 Phone: +91 9884810585</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
