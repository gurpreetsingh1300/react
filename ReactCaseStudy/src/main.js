import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import LoginForm from "./Components/LoginForm";
import PurchasedItems from "./Components/PurchasedItems";
import ProductDetails from "./Components/ProductDetails";
import './../assets/css/index.css';

ReactDOM.render((
  <BrowserRouter>
    <React.Fragment>
      <Route path='/' component={LoginForm} exact />
      <Route path='/purchasedItems' component={PurchasedItems} />
      <Route path='/productDetails/:id' component={ProductDetails} />
    </React.Fragment>
  </BrowserRouter>
), document.getElementById('app')
)
