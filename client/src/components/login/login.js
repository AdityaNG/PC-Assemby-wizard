/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-constructor */
import React from "react";
import loginImg from "../../login.svg";

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  login_start() {
    console.log("Login user : ")
    
    let email = document.getElementById("login-email").value
    let password = document.getElementById("login-password").value
    let reg_url = "http://localhost:8081/api/users/login?email=" + email + "&password=" + password

    httpGetAsync(reg_url, function (res) {
      console.log(res)
      var result = JSON.parse(res)
      if (result.error) {
        alert("Error : " + result.error)
        return;
      }

      alert("Logged in : " + result.user_uuid)
      document.cookie = "user_uuid=" + result.user_uuid;
      window.location.reload();
    })
    console.log(reg_url)
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="login-email" type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="login-password" type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.login_start.bind(this)}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
