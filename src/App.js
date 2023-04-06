import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Products from "./component/Products";
import Product from "./component/Product";
import Cart from "./component/Cart";
import About from "./component/About"
import Contact from "./component/Contact"
import { Switch, Route } from "react-router-dom";
import Checkout from "./component/Checkout";
import Userinfo from "./component/Userinfo";
import Orderfinal from "./component/Orderfinal";
import Login from "./component/Login";
import Register from "./component/Register";
import Payment from './component/Payment'
import Footer from "./component/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/checkout" component={Checkout} /> 
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/userinfo" component={Userinfo}/>
        <Route exact path="/orderfinal" component={Orderfinal}/>
        <Route exact path="/payment" component={Payment}/>
      </Switch>
    </>
  );
}

export default App;
