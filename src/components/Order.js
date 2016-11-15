import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';


class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const wine = this.props.wines[key]; // the specific wine
    const count = this.props.order[key]; // how many wines are in order?
    // make the remove order button
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if(!wine || wine.status === 'unvailable') {
      return <li key={key}>Sorry, {wine ? wine.name: 'wine'} is no loneger available! {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            className="count"
            component="span"
            transitionName='count'
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          bottle(s) {wine.name} {removeButton}
        </span>
        <span className="price">{formatPrice(count * wine.price)}</span>
      </li>
    )

  }
  render() {
    // make an array with all of the order keys
    const orderKeys = Object.keys(this.props.order);
    // .reduce() allows to loop over orderKeys array and returns a new object(total)
    const totalOrder = orderKeys.reduce((prevTotal, key) => {
      const wine = this.props.wines[key]; // the specific wine
      const count = this.props.order[key]; // how many wines are in order?
      const isAvailable = wine && wine.status === 'available'; // is that wine available?

      if(isAvailable) {
        return prevTotal + (count * wine.price || 0) // if available return the new amount
      }
      return prevTotal; // if not available return the prevTotal (last amount)
    }, 0);
    return (
      <div className="order-wrap">
        <h2> Your Order</h2>
        {/* change ul into CSSTransitionGroup tag that has property ul */}
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName='order'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
          {orderKeys.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(totalOrder)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
}

Order.propTypes = {
  wines: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
};
export default Order;
