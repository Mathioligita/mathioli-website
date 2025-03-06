// pages/CheckoutPage.js
"use client";
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
        nameOnCard: ''
    });

    const [cartItems,setCartItem] = useState([
        { name: 'Gift Guatemala', price: 70.00, image: '/path/to/image1.jpg' },
        { name: 'Kantha Kusumbam', price: 50.00, image: '/path/to/image2.jpg' },
        { name: 'Amrutha Kudam (volume 1)', price: 400.00, image: '/path/to/image3.jpg' },
        { name: 'Akshmala - mazai', price: 70.00, image: '/path/to/image4.jpg' }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePayment = () => {
        setCartItem([
            { name: 'Gift Guatemala', price: 70.00, image: '/path/to/image1.jpg' },
            { name: 'Kantha Kusumbam', price: 50.00, image: '/path/to/image2.jpg' },
            { name: 'Amrutha Kudam (volume 1)', price: 400.00, image: '/path/to/image3.jpg' },
            { name: 'Akshmala - mazai', price: 70.00, image: '/path/to/image4.jpg' }
        ])
        // Handle payment logic here
        // console.log('Payment processed', formData);
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const shipping = 53.10;
    const estimatedTaxes = 0.00;
    const total = subtotal + shipping + estimatedTaxes;

    return (
        <div className={styles['checkout-page']}>
            <div className={styles['checkout-form']}>
                <Card title="Checkout">
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-6">
                            <Dropdown value={formData.country} options={['India', 'USA', 'UK']} onChange={(e) => handleChange({ target: { name: 'country', value: e.value } })} placeholder="Country" />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText value={formData.firstName} onChange={handleChange} name="firstName" placeholder="First name" />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText value={formData.lastName} onChange={handleChange} name="lastName" placeholder="Last name" />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText value={formData.address} onChange={handleChange} name="address" placeholder="Address" />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText value={formData.city} onChange={handleChange} name="city" placeholder="City" />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <Dropdown value={formData.state} options={['Tamil Nadu', 'Kerala', 'Karnataka']} onChange={(e) => handleChange({ target: { name: 'state', value: e.value } })} placeholder="State" />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText value={formData.pinCode} onChange={handleChange} name="pinCode" placeholder="PIN code" />
                        </div>
                        <div className="p-col-12">
                            <InputText value={formData.cardNumber} onChange={handleChange} name="cardNumber" placeholder="Card number" />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText value={formData.expirationDate} onChange={handleChange} name="expirationDate" placeholder="Expiration date (MM/YY)" />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText value={formData.securityCode} onChange={handleChange} name="securityCode" placeholder="Security code" />
                        </div>
                        <div className="p-col-12">
                            <InputText value={formData.nameOnCard} onChange={handleChange} name="nameOnCard" placeholder="Name on card" />
                        </div>
                        <div className="p-col-12">
                            <Button label="Pay Now" onClick={handlePayment} />
                        </div>
                    </div>
                </Card>
            </div>
            <div className={styles['checkout-summary']}>
                <Card title="Order Summary">
                    <div className={styles['cart-items']}>
                        {cartItems.map((item, index) => (
                            <div key={index} className={styles['cart-item']}>
                                <img src={item.image} alt={item.name} className={styles['item-image']} />
                                <div className={styles['item-details']}>
                                    <div className={styles['item-name']}>{item.name}</div>
                                    <div className={styles['item-price']}>₹{item.price.toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles['summary-details']}>
                        <div>Subtotal ({cartItems.length} items): ₹{subtotal.toFixed(2)}</div>
                        <div>Shipping: ₹{shipping.toFixed(2)}</div>
                        <div>Estimated taxes: ₹{estimatedTaxes.toFixed(2)}</div>
                        <div className={styles['total']}>Total: ₹{total.toFixed(2)}</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CheckoutPage;
