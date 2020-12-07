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


export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  register_start() {
    console.log("Register user : ")
    
    let username = document.getElementById("reg-username").value
    let email = document.getElementById("reg-email").value
    let password = document.getElementById("reg-password").value
    let reg_url = "http://localhost:8081/api/users/create?email=" + email + "&password=" + password + "&name=" + username

    httpGetAsync(reg_url, function (res) {
      console.log(res)
      var result = JSON.parse(res)
      if (result.error) {
        alert("Error : " + result.error)
        return;
      }
      document.cookie = "user_uuid=" + result.user_uuid;
      alert("Success : " + res)
      window.location.reload()
    })
    console.log(reg_url)
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="reg-username" type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="reg-email" type="text" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="reg-password" type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.register_start.bind(this)}>
            Register
          </button>
        </div>
      </div>
    );
  }
}
