import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PrivacyPolicy() {
  return (
    <div className=" mt-4">
      <h2 className="paymentplociyheading-style">Privacy Policy</h2>

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
          ), we are committed to protecting your privacy and ensuring that your
          personal information is handled in a safe and responsible manner. This
          Privacy Policy outlines how we collect, use, and safeguard your data
          when you visit our website or make a purchase from us.
        </p>
        <h6>1. Information We Collect</h6>
        <ul className="list-style-disc">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, shipping and billing address, and payment details when you
            place an order.
          </li>
          <li>
            <strong>Non-Personal Information:</strong> Browser type, device
            information, IP address, and browsing behavior on our website.
          </li>
        </ul>

        <h6>2. How We Use Your Information</h6>
        <ul>
          <li>Process and fulfill your orders.</li>
          <li>Provide customer support and respond to inquiries.</li>
          <li>Improve our website and personalize your experience.</li>
          <li>Send promotional emails and offers (if you’ve opted in).</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h6>3. How We Protect Your Data</h6>
        <ul>
          <li>Secure Socket Layer (SSL) encryption for all transactions.</li>
          <li>Restricted access to sensitive information.</li>
          <li>Regular monitoring for potential security vulnerabilities.</li>
        </ul>

        <h6>4. Sharing Your Information</h6>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your data with:
        </p>
        <ul>
          <li>
            Payment gateways and shipping partners to process and deliver your
            orders.
          </li>
          <li>Service providers who assist us in operating our website.</li>
          <li>Legal authorities if required by law.</li>
        </ul>

        <h6>5. Cookies and Tracking Technologies</h6>
        <p>
          We use cookies to improve your browsing experience and provide
          personalized recommendations. By using our website, you agree to our
          use of cookies. You can manage your cookie preferences through your
          browser settings.
        </p>

        <h6>6. Third-Party Links</h6>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for their privacy practices or content. Please review
          their privacy policies before sharing your information.
        </p>

        <h6>7. Your Rights</h6>
        <ul style={{ listStyle: "disc !important" }}>
          <li>Access and review your personal information.</li>
          <li>Request corrections or updates to your data.</li>
          <li>Opt out of promotional emails.</li>
          <li>
            Request deletion of your personal data, subject to legal
            requirements.
          </li>
        </ul>
        <p>
          To exercise your rights, contact us at{" "}
          <strong>Email: uthiradambooks@gmail.com</strong>
        </p>

        <h6>8. Changes to This Privacy Policy</h6>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page, and the “Last Updated” date will be revised
          accordingly.
        </p>

        <h6>9. Contact Us</h6>
        <p>
          If you have any questions or concerns about this Privacy Policy, feel
          free to reach out to us:
        </p>
        <p>📧 Email: uthiradambooks@gmail.com</p>
        <p>📞 Phone: +91 9884810585</p>
      </div>
    </div>
  );
}
