
import React, {Component} from 'react';
//import the child classes
import Nav from './Navbar' 
import Main from './Main' 
import Footer from './Footer' 
import './App.css';



class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <Main />
        <Footer />
      </div>
    );
  }

}

export default App;
