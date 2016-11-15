import React from 'react';
import { Flex, Box } from 'reflexbox';
import sampleWines from '../sample-wines';

import Header from './Header';
import Order from './Order';
import EditCollection from './EditCollection';
import Wine from './Wine';
import base from '../base';


class App extends React.Component {
  constructor() {
    super();
    this.addWine = this.addWine.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateWine = this.updateWine.bind(this);
    this.removeWine = this.removeWine.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    // get initial state
    this.state = {
      wines: {},
      order: {}
    };
  }
  componentWillMount() {
    // this runs right before the App is rendered
    // tell firebase to sync just the wines from the curent store
    // hardcode store url: "itchy-bewildered-leaves/wines"
    this.ref = base.syncState(`${this.props.params.storeId}/wines`,
      {
        context: this,
        state: 'wines'
      });
    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  // this runs whenever props or state changes:
  componentWillUpdate(nextProps, nextState) {
    // store the order of that specific store in localhost
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addWine(wine) {
    // update state
    const wines = {...this.state.wines};
    // add new wine
    const timestamp = Date.now();
    wines[`wine-${timestamp}`] = wine;
    //set new state
    this.setState({ wines: wines});
  }

  updateWine(key, updatedWine) {
    const wines = {...this.state.wines};
    wines[key] = updatedWine;
    this.setState({ wines });
  }

  removeWine(key) {
    const wines = {...this.state.wines};
    wines[key] = null;
    this.setState({ wines });
  }
  removeFromOrder(key) {
    const order = {...this.state.order};
    // delete from order
    delete order[key];
    this.setState({ order });
  }
  loadSamples() {
    this.setState({
      wines: sampleWines
    });
  }
  addToOrder(key) {
    //take a copy of our state
    const order = {...this.state.order};
    // update or add the new amount of wine ordered
    order[key] = order[key] +1 || 1;
    // update our state
    this.setState({ order });
  }
  render() {
    return (
      <Flex wrap className="red-wine-collection" >
        <Box col={12} lg={4} sm={6} className="menu">
          <Header slogan="Exclusive Red wines from the best vines"/>
          <ul className="list-of-wines">
            {
              Object.keys(this.state.wines)
            .map(key => <Wine
              key={key} index={key}
              details={this.state.wines[key]}
              addToOrder={this.addToOrder}/>)
            }
          </ul>
        </Box>
        <Box col={12} lg={4} sm={6} className="order">
          <Order wines={this.state.wines} order={this.state.order} params={this.props.params} removeFromOrder={this.removeFromOrder}/>
        </Box>
        <Box col={12} lg={4} sm={6} className="edit-collection" >
          <EditCollection
            wines={this.state.wines}
            addWine={this.addWine}
            updateWine={this.updateWine}
            removeWine={this.removeWine}
            loadSamples={this.loadSamples}
             />
        </Box>
      </Flex>

    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}
export default App;
