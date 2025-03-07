

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { ProfileUserPatch } from 'api/page';

const ProfileInformation = ({ user  }) => {
  console.log(user);
  
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      address: user?.address || "",
      profileImage: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      mobile: Yup.string().required('Mobile number is required'),
      address: Yup.string().required('Address is required'),
    }),   
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === 'profileImage' && values.profileImage) {
            formData.append(key, values.profileImage);
          } else {
            formData.append(key, values[key]);
          }
        });

        const response = await ProfileUserPatch(formData)
        console.log('Profile updated:', response.data);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Row> 
        <Col sm={12} md={6}>
          <div className="text-start mb-3">
            <label htmlFor="firstName" className='mb-1'>First Name</label><br />
            <InputText id="firstName" {...formik.getFieldProps('firstName')} className="p-inputtext-lg w-100" />
            {formik.touched.firstName && formik.errors.firstName ? <div className="text-danger">{formik.errors.firstName}</div> : null}
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div className="text-start mb-3">
            <label htmlFor="lastName" className='mb-1'>Last Name</label><br />
            <InputText id="lastName" {...formik.getFieldProps('lastName')} className="p-inputtext-lg w-100" />
            {formik.touched.lastName && formik.errors.lastName ? <div className="text-danger">{formik.errors.lastName}</div> : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <div className="text-start mb-3">
            <label htmlFor="email" className='mb-1'>Email Address</label><br />
            <InputText id="email" {...formik.getFieldProps('email')} className="p-inputtext-lg w-100" />
            {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div className="text-start mb-3">
            <label htmlFor="mobile" className='mb-1'>Mobile Number</label><br />
            <InputText id="mobile" {...formik.getFieldProps('mobile')} className="p-inputtext-lg w-100" />
            {formik.touched.mobile && formik.errors.mobile ? <div className="text-danger">{formik.errors.mobile}</div> : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12}>
          <div className="text-start">
            <label htmlFor="address" className='mb-1'>Address</label><br />
            <InputTextarea id="address" {...formik.getFieldProps('address')} className="p-inputtext-lg w-100" />
            {formik.touched.address && formik.errors.address ? <div className="text-danger">{formik.errors.address}</div> : null}
          </div>
        </Col>
        <Col sm={12} md={6} className='d-none'>
          <div className="text-start mb-3">
            <label htmlFor="profileImage" className='mb-1'>Profile Image</label><br />
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={(event) => formik.setFieldValue('profileImage', event.currentTarget.files[0])}
            />
          </div>
        </Col>
      </Row>

      <Divider />
      <div className=" profile-contents-button  ">

        <Button className=" profile-buttonssssss-buttons" onClick={() => onNavigate("Profile")}>
       Save
        </Button>
      </div>
    </form>
  );
};

export default ProfileInformation;
