import React from 'react';
import { formatPrice } from '../helpers';

class Wine extends React.Component {
  render() {
    // make a constant to replase this.props
    const { details, index } = this.props;
    // change button depending on wine status
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <li className="menu-wine">
        <img src={details.image} alt={this.name}/>
        <div className="wine-text">
          <h3 className="wine-name">
            {details.name}
            <span className="price">{formatPrice(details.price)}</span>
          </h3>
          <p>{details.desc}</p>
          <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
        </div>
      </li>
    )
  }
}

Wine.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  addToOrder: React.PropTypes.func.isRequired
};
export default Wine;
