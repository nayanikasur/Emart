import React, {useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Logregister.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Payment = () => {
    const [cardnumber,setCardNumber] = useState('');
    const [cvv,setCvv] = useState('');
    const [expdate,setExpdate] = useState('');
    const [nameofuser,setNameofuser] = useState ('');
    const history = useHistory();
    const credentials = useSelector((state) => state.checkcredential);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post(
          "https://localhost:7262/api/Payment/create",
          {
            "paymentId": 0,
            "cardnumber": cardnumber,
            "cvv": cvv,
            "expdate": expdate,
            "nameofuser": nameofuser
          },
        )
        .then((response) => {
          console.log("adding to database", response);
          if (response.data) {
            history.push("/orderfinal");
          }
        })
        .catch((error) => {
          alert("Error in backend, failed!");
          console.error(error);
        });
        console.log(credentials)
        axios.post("https://localhost:7262/api/Ccart/Deletecartitems",credentials)

    }

    
    const onChange = (e) => {
        setCardNumber(e.target.value);
    }
    const onChange1 = (e) => {
        setCvv(e.target.value);
    } 
    const onChange2 = (e) => {
        setExpdate(e.target.value);
    } 
    const onChange3 = (e) => {
        setNameofuser(e.target.value);
    }

  return (
    <div>
      
   
    <div className='auth-form-container'>
    <form className='auth-form' onSubmit={handleSubmit}>
        <h1>Enter Card Details </h1>
        <label for="cardnumber" class="form-label">Card Number</label>
        <input className="form-control mb-3" value= {cardnumber} type="text" pattern="[0-9]{16}" maxLength={16}  placeholder='XXXX-XXXX-XXXX-XXXX'id="cardnumber" name="cardnumber" onChange={onChange
        } required/> 
        <label for="cvv" class="form-label">CVV</label>
        <input value={cvv} type="password" class="form-control mb-3" pattern="[0-9]{3}" maxLength={3} placeholder='***' id="cvv" name="cvv" onChange={onChange1
        } required/>
        <label for="expdate" class="form-label">Expiry Date</label>
        <input value={expdate} type="date" class="form-control mb-3" placeholder='dd/mm/yyy' id="expdate" name="expdate" onChange={onChange2
        } required/>
        <label for="name" class="form-label">Card Holders Name</label>
        <input value={nameofuser} type="text" class="form-control mb-3" id="name" name="name" onChange={onChange3
        } required/>
        <button type='submit' className='btn btn-primary mb-3'>Proceed to place order</button>
    </form>
    </div>
    </div>
    
  )
}

export default Payment