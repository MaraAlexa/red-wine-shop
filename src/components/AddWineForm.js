import React from 'react';

class AddWineForm extends React.Component {
  createWine(event) {
    event.preventDefault();
    console.log('make wine');
  const wine = {
    name: this.name.value,
    price: this.price.value,
    status: this.status.value,
    desc: this.desc.value,
    image: this.image.value
  }
  this.props.addWine(wine);
  // reset form after submit
  this.wineForm.reset();
  }
  render() {
    return (
      <form ref={(input) => this.wineForm = input} className="wine-edit" onSubmit={(e) => this.createWine(e)}>
        <input ref={(input) => this.name = input} type="text" placeholder="Wine Name" />
        <input ref={(input) => this.price = input} type="text" placeholder="Wine Price" />
        <select ref={(input) => this.status = input} >
          <option value="available">Available!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(input) => this.desc = input} placeholder="Wine Description"></textarea>
        <input ref={(input) => this.image = input} type="text" placeholder="Wine Image"/>
        <button type="submit">Add Wine</button>
      </form>

    )
  }
}

AddWineForm.propTypes = {
  addWine = React.PropTypes.func.isRequired
}

export default AddWineForm;
