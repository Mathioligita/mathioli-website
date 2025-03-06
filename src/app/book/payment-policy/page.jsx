import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const PaymentPolicy = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Payment Policy</h2>
            <p>
              At <strong>Mathioli Gita</strong> (<a href="https://www.mathioligita.com/">https://www.mathioligita.com/</a>), we strive to ensure a smooth and secure payment experience for our customers. This Payment Policy outlines the terms and conditions regarding payments on our website.
            </p>

            <h4>1. Accepted Payment Methods</h4>
            <ul>
              <li>Credit Cards (Visa, MasterCard, American Express)</li>
              <li>Debit Cards (All major banks)</li>
              <li>Net Banking</li>
              <li>UPI (Unified Payment Interface)</li>
              <li>Digital Wallets (e.g., Paytm, Google Pay, PhonePe)</li>
            </ul>

            <h4>2. Currency</h4>
            <ul>
              <li>All transactions on our website are processed in Indian Rupees (INR).</li>
              <li>For international customers, payment will be converted to INR based on your bank's exchange rate.</li>
            </ul>

            <h4>3. Secure Payment Gateway</h4>
            <ul>
              <li>Our website uses industry-standard SSL (Secure Socket Layer) encryption to protect your personal and payment information.</li>
              <li>Payments are processed through trusted and secure payment gateways to ensure data security.</li>
            </ul>

            <h4>4. Payment Confirmation</h4>
            <ul>
              <li>Once a payment is successfully processed, you will receive a confirmation email or SMS with your order details.</li>
              <li>If you do not receive a confirmation within 24 hours, please contact our customer support team.</li>
            </ul>

            <h4>5. Payment Failures</h4>
            <ul>
              <li>In case of payment failure, please ensure that you:</li>
              <ul>
                <li>Enter correct payment details.</li>
                <li>Check sufficient funds in your account.</li>
                <li>Verify the validity of your payment method.</li>
              </ul>
              <li>If the problem persists, contact our support team or your payment provider for assistance.</li>
            </ul>

            <h4>6. Taxes and Fees</h4>
            <ul>
              <li>All applicable taxes (e.g., GST) are included in the product price or displayed at checkout.</li>
              <li>There are no hidden charges. Any additional fees, such as shipping charges, will be explicitly mentioned at the time of payment.</li>
            </ul>

            <h4>7. Customer Support</h4>
            <p>
              For any payment-related queries, you can contact our support team:
              <br />
              📧 Email: support@mathioligita.com
              <br />
              📞 Phone: +91 XXXXX XXXXX
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPolicy;
