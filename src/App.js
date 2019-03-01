import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModalComponent from "./components/ItemModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { config } from './config/config';
import firebase from 'firebase';
import { Provider, connect } from "react-redux";
import store from "./store";

import { addEvent, deleteEvent } from './actions/eventsActions'

class App extends Component {
  constructor(props){
    super(props);

    this.app = firebase.initializeApp(config);
    this.db =  this.app.database().ref().child('events')
  }

  saveEvent = event => {
    const newEvent = this.db.push();
    newEvent.set(event)
  }

  deleteEvent = id => {
    this.db.child(id).remove()
  }

  componentDidMount(){
    this.db.on('child_added', snap => {
      const event = {
        name: snap.val().name,
        eventDescription: snap.val().eventDescription,
        eventImportant: snap.val().eventImportant,
        eventTime: snap.val().eventTime,
        _id: snap.key
      }
      store.dispatch(addEvent(event))
    })

    this.db.on('child_removed', snap => {
      store.dispatch(deleteEvent(snap.key))
    })
  }
  render() {
    return (
      <Provider store={store}>
        <div style={{minWidth: 460}}>
          <AppNavbar />
          <ItemModalComponent saveEvent={event => this.saveEvent(event)}/>
          <ShoppingList deleteEvent={id => this.deleteEvent(id)}/>
        </div>
      </Provider>
    );
  }
}

export default App;

