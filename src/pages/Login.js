// import React, { useState } from 'react'
// // function Set(){
// // const [Email,setEmail]=useState("");
// // const [Password,setPassword]=useState("");
// // use 
// // }

// const Login = (props) => {
//     function login(e) {
//         e.preventDefault();
//         var email = document.getElementById("email").value;
//         console.log(email);
//         var password = document.getElementById("password").value;
//         console.log(password);

//         fetch('https://projects.parthvi.tech/api/v1/auth/login/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 email: email,
//                 password: password
//             })
//         }).then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 if (data.status_code === 200) {
//                     console.log("login")
//                     document.getElementById("status").innerHTML = data.data.email;
//                     localStorage.setItem('token',data.data.token);
//                     window.location="/admin";
//                 }
//                 else {
//                     console.log("error")
//                     document.getElementById("status").innerHTML = "Enter correct credential";
//                 }
//             });



//     }


//     return (
//         <div>
//             <h1>Login </h1>
//             <form action="post" onSubmit={login}>
//                 Email : <input type="Email" placeholder="E-mail" name="email" id="email" required /><br /><br />
//                 Password : <input type="Password" name="password" id="password" required /><br /><br />
//                 <button> Login</button>
//             </form>
//             <div><h1 id="status"></h1></div>


//         </div>


//     )

// }

// export default Login

import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
