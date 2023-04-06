import React, {useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import './Logregister.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userLogin, verifycredentials } from '../redux/action';

const Login = () => {
    const [email,setemail] = useState('');
    const [pass,setpass] = useState('');
    const history = useHistory();
    const dispatch=useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const ItemsPassable = {
            emailId: email,
            pw: pass
          };
          axios
            .post("https://localhost:7262/api/Login/LoginHere", ItemsPassable)
            .then((x) => {
              if (x.data == "succes") {
                dispatch(userLogin())
                dispatch(verifycredentials(ItemsPassable))
                history.push("/");
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
        setpass(e.target.value);
    }

  return (
    <div className='auth-form-container'>
        
    <form className='auth-form' onSubmit={handleSubmit}>
        <h1>LOG IN </h1>
        <label for="email" class="form-label">Email</label>
        <input className="form-control mb-3" value= {email} type="email" placeholder='youremail@gmail.com'id="email" name="email" onChange={onChange
        }/> 
        <label for="Password" class="form-label">Password</label>
        <input value={pass} type="password" class="form-control mb-3" placeholder='**********'id="password" name="password" onChange={onChange1
        } />
        <button type='submit' className='btn btn-primary mb-3'>Log In</button>
    </form>
    <NavLink to="/Register">Dont have an account? Register here.</NavLink>
    </div>
    
  )
}

export default Login