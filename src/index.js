import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import './css/style.css';

// import all your components
import PickAStore from './components/PickAStore';
import App from './components/App';
import NotFound from './components/NotFound';

// make a Root stateless functional component for routing that returns 3 different pages

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/' component={PickAStore}/>
        <Match pattern='/store/:storeId' component={App}/>
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));
