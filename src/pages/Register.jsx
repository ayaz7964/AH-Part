import React from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
const Register = () => {
  let [register, setRegister] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
    const handleSubmit = (e) => {
        sessionStorage.setItem(register.email,register );
        }   
          
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="form my-3">
                <label for="Name">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="Name"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  name="name"
                  value={register.name}
                  required
                />
              </div>
              <div class="form my-3">
                <label for="Email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  name="email"
                  value={register.email}
                  
                />
              </div>
              <div class="form  my-3">
                <label for="Password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="Password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={register.password}
                 
                />
              </div>
              <div calss Name="reg-as">
                <p>Register as</p>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="role"
                  value={register.role}
                  required
                >
                  <option selected>Choose...</option>
                  <option value="1">Seller</option>
                  <option value="2">Buyer</option>
                </select>
                {console.log(register)}
              </div>
              <div className="my-3">
                <p>
                  Already has an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    Login
                  </Link>{" "}
                </p>
              </div>

              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" onClick={handleSubmit}> 
                  Register
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

export default Register;
