import React from 'react';
import AddWineForm from './AddWineForm';
import base from '../base';

class EditCollection extends React.Component {
  constructor() {
    super();
    this.renderEditWine = this.renderEditWine.bind(this); // put the Html on page
    this.handleChange = this.handleChange.bind(this); // updates the editing
    this.renderLogin = this.renderLogin.bind(this); // the Login Buttons
    this.authenticate = this.authenticate.bind(this); // authentication with authWithOAuthPopup()
    this.authHandler = this.authHandler.bind(this); // auth RULES
    this.logout = this.logout.bind(this); // unauth()

    this.state = { // set the user id and owner to be nothing by default
      uid: null,
      owner: null,
      anonymous: null // ANONYMOUS state
    }
  }
// when RELOADING the page KEEP THE USER logged in
// by running authHandler again that does all the checking and setting of state
  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) { // Update the wine state with the new data
    const wine = this.props.wines[key];
    // take a copy of the wine and updated with the new data
    const updatedWine = {
      ...wine,
      [e.target.name]: e.target.value
    }
    this.props.updateWine(key, updatedWine);
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    // authenticate the person with diferrent providers
    // (after clicking authenticate with github or other  provider), run authhandler
    base.authWithOAuthPopup( provider, this.authHandler);

  }

  authenticateAnonymously() {
    const auth = base.auth();
    auth.signInAnonymously();
    auth.signOut();
    console.log('Trying to log in Anonymously');
  }

  logout() {
    base.unauth();
    const storeRef = base.database().ref(this.props.storeId);
    storeRef.once('value', (snapshot) => {
      storeRef.set({
        owner: null
      })
    })
    this.setState({ uid: null });
  }
  // authHandler gives AN ERROR If there is one & logs all the authentication data of the user(name, email, etc)
  authHandler(err, authData) {
    console.log(authData);
    if(err) {
      console.log(err);
      return;
    }

    // GRAB the STORE INFO (only the store you are in with ref)
    // => pass down the storeId in App (this.props.params.storeId) to use it here in EditCollection
    const storeRef = base.database().ref(this.props.storeId);
    // query(get) the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
    // claim it as your own if there is no owner already
    if(!data.owner) {
      storeRef.set({
        // the uid is unique coming from github
        owner: authData.user.uid
      });
    }
// if you are the owner, show all the data of that specific store
    this.setState({
      uid: authData.user.uid,
      owner: data.owner || authData.user.uid
    });
    this.props.loadSamples(); // load data as soon as you are authenticated
  });

  }
// create a method that is going to create the buttons
  renderLogin() {
    return(
      <nav className="login">
        <h2>EDIT COLLECTION</h2>
        <p className='signIn-text'>Sign In to manage your store</p>
        <button className="github" onClick={ () => this.authenticate('github') }>Log In with Github</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
        <button className="anonymous" onClick={() => this.authenticateAnonymously('anonymous')}>Log In Anonymously</button>
      </nav>
    )
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
    // the LOGOUT button
    const logout = <button className='logout-btn' onClick={this.logout} >Log Out!</button>

    if(!this.state.uid) { // check if they are not logged in at all
      return <div>{this.renderLogin()}</div>
    }
    // check if they are the OWNER of the current store
    // store the users id in state once they are logged in
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store!</p>
          {logout}
        </div>
      )
    }
    return (
      <div className="edit-collection-wrapper">
        <h2>Edit Collection</h2>
        {logout}
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
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
};

export default EditCollection;
