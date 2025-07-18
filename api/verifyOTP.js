import fetchHandler from "./Handler";

export const VerifyOTPAPI = async (data) => {

    try {
        
        const response = await fetchHandler({
          method: "POST",
          endpoint: `/users/verify-otp`,
          data,
        });
        // await addToCartAPI();
        return response;
   

    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  export const ForgotPasswordAPI = async (data) => {

    try {
        
        const response = await fetchHandler({
          method: "POST",
          endpoint: `/users/forgot-password`,
          data,
        });
        // await addToCartAPI();
        return response;
   

    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

   export const VerifyForgotPasswordOTPAPI = async (data) => {

    try {
        
        const response = await fetchHandler({
          method: "POST",
          endpoint: `/users/verify-forgot-password-otp`,
          data,
        });
        // await addToCartAPI();
        return response;
   

    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

export const ResetPasswordAPI = async (data) => {

    try {
        
        const response = await fetchHandler({
          method: "POST",
          endpoint: `/users/reset-password`,
          data,
        });
        // await addToCartAPI();
        return response;
   

    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  export const ResendOTPAPI = async (data) => {
    console.log("resend otp data",data);

    try {
        
        const response = await fetchHandler({
          method: "POST",
          endpoint: `/users/resend-otp`,
          data,
        });
        // await addToCartAPI();
        return response;   
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

