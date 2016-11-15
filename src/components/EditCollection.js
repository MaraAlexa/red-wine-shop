import React from 'react';
import AddWineForm from './AddWineForm';

class EditCollection extends React.Component {
  constructor() {
    super();
    this.renderEditWine = this.renderEditWine.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, key) {
    const wine = this.props.wines[key];
    // take a copy of the wine and updated with the new data
    const updatedWine = {
      ...wine,
      [e.target.name]: e.target.value
    }
    this.props.updateWine(key, updatedWine);
  }

  renderEditWine(key) {
    const wine = this.props.wines[key];
    return (
      <div className="wine-edit" key={key}>
        <input type="text" name='name' value={wine.name} placeholder='Wine Name'
        onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name='price' value={wine.price} placeholder='Wine Price'
          onChange={(e) => this.handleChange(e, key)} />

        <select type="text" name='status' value={wine.status} placeholder='Wine Status'
        onChange={(e) => this.handleChange(e, key)}  >
          <option value="available">In stock</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea type="text" name='desc' value={wine.desc} placeholder='Wine Desc' onChange={(e) => this.handleChange(e, key)} ></textarea>
        <input type="text" name='image' value={wine.image} placeholder='Wine Image' onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeWine(key)}>Remove Wine</button>
      </div>
    )
  }
  render() {
    return (
      <div className="">
        <h2>Edit Collection</h2>
        {/* loop over our wines */}
        {Object.keys(this.props.wines).map(this.renderEditWine)}
        <AddWineForm addWine={this.props.addWine}/>
        <button onClick={this.props.loadSamples}>Load Sample Wine</button>

      </div>

    )
  }
}

EditCollection.propTypes = {
  wines: React.PropTypes.object.isRequired,
  updateWine: React.PropTypes.func.isRequired,
  removeWine: React.PropTypes.func.isRequired,
  addWine: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default EditCollection;
