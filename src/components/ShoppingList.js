import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Col } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { deleteEvent } from "../actions/eventsActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  state = {
    hover: false,
  }

  deleteEvent = id => {
    // const { dispatch } = this.props;

    // dispatch(deleteEvent(id))

    this.props.deleteEvent(id)
  };

  toggleHover = (id, hover) =>{
    this.setState({hover, hoverId: id})
  }
  render() {
    const { events } = this.props.event;
    const { hoverId, hover } = this.state;
    return (
      <div style={{ background: '#f6f6f6'}}>
        <Container style={{height: '100vh'}}>
          <ListGroup>
            <TransitionGroup className="shopping-list" style={{marginTop: 10}}>
              {events.map(({ _id, name, eventTime, eventDescription, eventImportant }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem 
                    className="event-item"
                    onMouseEnter={() => this.toggleHover(_id, true)} 
                    onMouseLeave={() => this.toggleHover(null, false)}
                    style={{
                      margin: '10px auto',
                      border: 'none',
                      borderLeft: `${hoverId === _id && hover ? 
                        '7px' : '3px'} solid ${eventImportant ? '#ff7eb5' : '#a9d85f'}`,
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                   <div className='event-time'>
                     <h3>{eventTime}</h3>
                   </div>
                   <div className='event-desc'>
                   <h3>{name}</h3>
                   <p>{eventDescription}</p>
                   </div>
                   <div className='event-delete'>
                     <h6 onClick={() => this.deleteEvent(_id)} style={{cursor: 'pointer'}}>X</h6>
                   </div>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  // getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  event: state.event
});

export default connect(
  mapStateToProps,
  dispatch => ({dispatch})
)(ShoppingList);
