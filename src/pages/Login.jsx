import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = (prob) => {
  let [login, setLogin] = React.useState({
    email: "",
    password: "",
  });
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  }

  const ValidateLogin = (e) => {
        e.preventDefault();
        const data = JSON.parse(sessionStorage.getItem(login.email));
    
    if(data === null){
       

      alert("Invalid email or password");}
      
    else if (data.password !== login.password ){
      alert("Invalid email or password");
    }
    else {
      alert("Login successful");
      window.location.href = "/";
    }
    
  }
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  name="email"
                  value={login.email}

                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={login.password}

                />
                {
                  console.log(prob.data)
                }
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" onClick={ValidateLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
