import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModalComponent from "./components/ItemModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <AppNavbar />
          <ItemModalComponent />
          <ShoppingList />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
