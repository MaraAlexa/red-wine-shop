import React from 'react';
import { getFunName } from '../helpers';

class PickAStore extends React.Component {
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }
  goToStore(event) {
    event.preventDefault();
    console.log('you changed url');
    // first grab the text from the input
    const storeId = this.storeInput.value; // store the input value into a variable called storeId
    console.log(`Going to ${storeId}`); // print the StoreId
    // transition from / to /store/:storeId by making the router available to PickAStore with context
    this.context.router.transitionTo(`/store/${storeId}`);
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder='Store Name' defaultValue={getFunName()}
          ref={(input) => {this.storeInput = input}}
        />
        <button type="submit">Go To Store</button>
      </form>
    )
  }
}
// make router available to PickAStore with Context
PickAStore.contextTypes = {
  router: React.PropTypes.object
}

export default PickAStore;
