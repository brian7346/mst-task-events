import React, { Component } from "react";
import {
  Button,
  Container
} from "reactstrap";
import { connect } from 'react-redux'

import{ handleAddModal } from '../actions/modalActions'

import './style.css'

class AppNavbar extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="app-navbar">
        <Container className="header-container">
          <div className="header-content">
            <div className="header-left-column">
              <h6 style={{color: 'white'}}>Мой календарь</h6>
              <div className="heder-buttons">
                <Button
                  onClick={() => dispatch(handleAddModal(true))}
                  style={{
                    background: '#a9d85f',
                    border: 'none',
                    marginRight: 30
                  }}
                >
                  Событие +
                </Button>
                <Button 
                  onClick={() => window.location.reload()}
                  style={{
                    background: 'transparent',
                    border: '1px solid #a9d85f'
                  }}>
                  Обновить
                </Button>
              </div>
            </div>
            <div className="header-right-column">
              <h3>Друзья, мои походы пока ещё <br />
                не закончились, делюсь с вами!</h3>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(state => ({state}), 
  dispatch => ({dispatch})
)(AppNavbar);
