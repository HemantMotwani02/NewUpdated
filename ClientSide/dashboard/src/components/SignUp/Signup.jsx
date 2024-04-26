import axios from "axios";
import { useState } from "react";

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(3);
  const [name, setName] = useState('');



  function handleDetails(event) {
    switch (event.target.name) {
      case 'name': setName(event.target.value); break;
      case 'email': setEmail(event.target.value); break;
      case 'password': setPassword(event.target.value); break;
      case 'confirmPassword': setConfirmPassword(event.target.value); break;
      case 'role': setRole(event.target.value); break;
      default: break;
    }
  }

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };


  const handleForm = async (e) => {
    // Prevent from auto-submitting
    e.preventDefault()

    // Checks the entry
    if (name === '' || email === '' || password === '') {
      alert("Fill all the fields"); return;
    }

    //Checks for valid email
    if (!validateEmail(email)) {
      alert("Enter a valid email address");
      return;
    }

    //checks for strong password
    // if (!validatePassword(password)) {
    //   alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    //   return;
    // }

    //match password
    if (password !== confirmPassword) {
      alert("Password and Confirm Password did not match"); return;
    }



    let response = await axios.post('http://localhost:7007/register', {
      name: name,
      password: password,
      ucpassword: confirmPassword,
      email: email,
      role: role,
      created_by: 1
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let result = await response.data
    if (result.status == 'success') {
      alert('User Added Succesfully')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setRole('')
      setName('')
    } else {

    }
  }


  return (

    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div className="form-container">
        <h1 style={{ color: 'black' }}>Register User</h1>
        <form onSubmit={handleForm} class="row g-3 myform bg-dark text-light">

          <div class="col-md-10">
            <label for="username" class="form-label">Name</label>
            <input value={name} onChange={handleDetails} name="name" type="text" class="form-control" id="username" required/>
          </div>

          <div class="col-10">
            <label for="email" class="form-label">Email</label>
            <input value={email} onChange={handleDetails} name="email" type="email" class="form-control" id="email" required/>
          </div>

          <div class="col-md-10">
            <label for="password" class="form-label">Password</label>
            <input value={password} onChange={handleDetails} name="password" type="password" class="form-control" id="password" required/>
          </div>

          <div class="col-md-10">
            <label for="cpassword" class="form-label">Confirm Password</label>
            <input value={confirmPassword} onChange={handleDetails} name="confirmPassword" type="password" class="form-control" id="cpassword" required/>
          </div>


          <div class="col-md-4">
            <label for="role" class="form-label">Role</label>
            {/* <input value={urole} onChange={handleDetails} name="role" type="number" class="form-control" id="role" /> */}
            <select value={role} onChange={handleDetails} name="role" type="number" class="form-control" id="role" >
              <option value="1">Super Admin</option>
              <option value="2">Manager</option>
              <option value="3" selected>Employee</option>
            </select>
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>

        </form>
      </div>
    </div>
  )
}
export default SignUp;