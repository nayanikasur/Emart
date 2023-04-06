import React, { startTransition, useState } from "react";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { NavLink } from "react-router-dom";
import "./Userinfo.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Front() {
  const [title,setTitle] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email,setemail] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [extension, setExtension] = useState("");
  const [address, setAddress] = useState("");
  const [pass,setpass] = useState('');
  const history = useHistory();
  // const dispatch=useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ItemsPassable = {
      customerId: 0,
      title: title,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      extension: extension,
      address: address
    }
    console.log(ItemsPassable)
      axios
        .post("https://localhost:7262/api/Checkout/create", ItemsPassable)
        .then((x) => {
          console.log(x.data)
          if (x.data == true) {
            history.push("/payment");
          } else {
            alert("Email or Password credentials are wrong. Try again");
          }
        });
   
    console.log(email);
}

const onChange = (e) => {
    setemail(e.target.value);
}
const onChange1 = (e) => {
    setFirstName(e.target.value);
}
const onChange2 = (e) => {
  setLastName(e.target.value);
}
const onChange3 = (e) => {
  setTitle(e.target.value);
}
const onChange4 = (e) => {
  setPhoneNumber(e.target.value);
}
const onChange5 = (e) => {
  setAddress(e.target.value);
}
const onChange6 = (e) => {
  setExtension(e.target.value);
}


return (

  <div className='auth-form-container'>
        
    <form className='auth-form' onSubmit={handleSubmit}>
        <h1>ENTER USER DETAILS </h1>
        <label for="title" class="form-label">Title</label>
        <input value={title} type="text" class="form-control mb-3" placeholder='title'id="title" name="title" onChange={onChange3
        } required/>
        <label for="firstname" class="form-label">First Name</label>
        <input value={firstName} type="text" class="form-control mb-3" placeholder='First Name 'id="firstname" name="firstname" onChange={onChange1
        } required/>
        <label for="lastName" class="form-label">Last Name</label>
        <input value={lastName} type="text" class="form-control mb-3" placeholder='Last Name'id="lastName" name="lastName" onChange={onChange2
        } required/>
        <label for="email" class="form-label">Email</label>
        <input className="form-control mb-3" value= {email} type="email" placeholder='youremail@gmail.com'id="email" name="email" onChange={onChange
        } required/> 
        
        <label for="phoneNumber" class="form-label">Phone number</label>
        <input value={phoneNumber} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" maxLength={10} type="tel" class="form-control mb-3" placeholder='000-00-000'id="phoneNumber" name="phoneNumber" onChange={onChange4
        } required/>
        <label for="extension" class="form-label">Extension</label>
        <input value={extension} type="text" pattern="[0-9]{3}" class="form-control mb-3" maxLength={3} placeholder='3 digit Number'id="extension" name="extension" onChange={onChange6
        } required/>
        <label for="address" class="form-label">Address</label>
        <input value={address} type="text" class="form-control mb-3" placeholder='Address'id="address" name="address" onChange={onChange5
        } required/>
        <button type='submit' className='btn btn-primary mb-3'>Proceed To pay </button>
    </form>
    <NavLink to="/Register">Dont have an account? Register here.</NavLink>
    </div>

)

}

export default Front;
