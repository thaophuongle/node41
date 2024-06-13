import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import FacebookLogin from "react-facebook-login";
import { Videos, ChannelCard } from ".";
import { checkCodeAPI, checkEmailAPI, loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI.js";


const ForgetPassword = () => {
    const [step, setStep] = useState(0)
    //0: nhập mail
    //1: nhập code
    //2: đổi pass
  
    return (
      <div className="p-5 " style={{ minHeight: "100vh" }}>
        <div className=" d-flex justify-content-center">
          {step == 0 && <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Enter your email
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {

                    let txtEmail = document.querySelector("#email").value;    
                    let model = {
                      email: txtEmail,
                    };
    
                   checkEmailAPI(model).then(result => {
                    setStep(1)
                   }).catch(error => {
                    alert(error.message)
                   })
                }}
              >
                Next
              </button>
            </div>
          </form>}

          {step == 1 && <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                We've sent a code to your email
              </label>
              <input type="email" className="form-control" id="code" />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    let txtCode = document.querySelector("#code").value;    
                    let model = {
                      code: txtCode,
                    };
    
                   checkCodeAPI(model).then(result => {
                    setStep(2)
                   }).catch(error => {
                    alert(error.message)
                   })
                }}
              >
                Next
              </button>
            </div>
          </form>}

          {step == 2 && <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Reset your password
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {}}
              >
                Reset
              </button>
            </div>
          </form>}
        </div>
      </div>
    );
}

export default ForgetPassword