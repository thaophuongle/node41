import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import FacebookLogin from "react-facebook-login";
import { Videos, ChannelCard } from ".";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI.js";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {}, []);

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                let txtEmail = document.querySelector("#email").value;
                let txtPassword = document.querySelector("#pass").value;

                let model = {
                  email: txtEmail,
                  password: txtPassword,
                };

                loginAPI(model)
                  .then((result) => {
                    alert(result.message);
                    localStorage.setItem("LOGIN_USER", result.data);
                    window.location.reload();
                  })
                  .catch((err) => {
                    alert(err.response.data.message);
                  });
              }}
            >
              Login
            </button>
            <a href="#" className="text-primary" onClick={() => navigate("/forget-password")}>Forget Password</a>
          </div>

          <FacebookLogin
            appId="769755171907919"
            fields="name,email,picture"
            callback={(response) => {
              console.log(response)
              //call API login facebook
              let model = {
                userId: response.userID,
                email: response.email,
                name: response.name
              }

              loginFacebookAPI(model).then(result => {
                alert("Login Facebook Successfully!")
                localStorage.setItem("LOGIN_USER", result.data)
                window.location.reload()
              })

            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
