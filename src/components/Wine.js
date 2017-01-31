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
          <div className="name-descr-wrapper">
            <h3 className="wine-name">{details.name}</h3>
            <p>{details.desc}</p>
          </div>
          <div className="add-to-order-wrapper">
            <span className="price">{formatPrice(details.price)}</span>
            <button
              className='add-to-order'
              onClick={() => this.props.addToOrder(index)}
              disabled={!isAvailable}>
                {buttonText}
            </button>
          </div>

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
