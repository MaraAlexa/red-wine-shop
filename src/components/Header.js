import React from 'react';

// make Header a stateless functional component
const Header = (props) => {
    return (
      <header className="top">
        <h1>Red
            Wine
          Collection
        </h1>
        <h3 className="tagline">
          <span>{props.slogan}</span>
        </h3>
      </header>
    )
 }
Header.propTypes = {
  slogan: React.PropTypes.string.isRequired
}

export default Header;
