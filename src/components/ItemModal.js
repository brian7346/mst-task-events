import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  FormFeedback,
  Row,
  Col
} from "reactstrap";
import TimePicker from 'rc-time-picker';
import { connect } from "react-redux";
import uuid from 'uuid';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

import { handleAddModal } from "../actions/modalActions";
import { addEvent } from "../actions/eventsActions";

class ItemModal extends Component {
  state = {
    name: "",
    eventTime: moment(),
    eventDescription: 'Описание не указанно',
    eventImportant: false,
    onFocus: "",
    nameInvalid: false,
  };

  toggle = () => {
    const { dispatch } = this.props;
    dispatch(handleAddModal(false))
  };

  addEvent = e => {
    const {
      name,
      eventTime,
      eventDescription,
      eventImportant
    } = this.state;

    if(name !== ''){
      const newEvent = {
        name,
        eventTime: eventTime ? eventTime.format('HH:mm') : moment().format('HH:mm'),
        eventDescription,
        eventImportant,
        _id: uuid()
      };

      this.props.saveEvent(newEvent)
  
      // this.props.dispatch(addEvent(newEvent))
  
      this.toggle();
      this.setState({
        name: "",
        eventTime: moment(),
        eventDescription: 'Описание не указанно',
        eventImportant: false,
        onFocus: "",
        nameInvalid: false,
      })
    } else {
        this.setState({nameInvalid: true})
    }
  };

  checkBoxChange = () => {
    const { eventImportant } = this.state;
    this.setState({ eventImportant: !eventImportant });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFocus = e => {
    this.setState({ ['onFocus']: e.target.name });
  }

  onBlur = e => {
    const { eventTime } = this.state;
    switch(e.target.name){
      case 'name':
        if(e.target.value === '') {
          this.setState({nameInvalid: true})
        } else {
          this.setState({nameInvalid: false})
        }
    }
  }

  timeChanged = eventTime => {
    this.setState({ eventTime });
  }
  render() {
    const { modalHandler } = this.props;
    const { 
      onFocus, 
      nameInvalid,
      descriptionInvalid
    } = this.state;
    return (
      <Modal isOpen={modalHandler.addEventModalOpen}>
        <ModalHeader toggle={this.toggle} style={{border: 'none'}}/>
        <ModalBody>
          <Form >
            <FormGroup style={{display:'flex', flexDirection: 'column'}}>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Событие"
                onChange={this.onChange}
                invalid={nameInvalid}
                // onFocus={this.onFocus}
                onBlur={this.onBlur}
                // style={{
                //   all: 'unset',
                //   border: 'none',
                //   borderBottom: onFocus === 'name' ? '2px solid #a9d85f' : 
                //     '1px solid #cccccc'
                // }}
              />
              <FormFeedback>Название обязательно!</FormFeedback>
            </FormGroup>
            <FormGroup>
              <TimePicker 
                defaultValue={moment()} 
                // placeholder="Время"
                showSecond={false} 
                onChange={this.timeChanged}
              /> <span style={{color: '#495057'}}>Время начала</span>
            </FormGroup>
            <FormGroup>
              <Input 
                type="textarea"
                placeholder="Описание"
                name="eventDescription"
                invalid={descriptionInvalid}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input 
                  type="checkbox" 
                  name="eventImportant"
                  onChange={this.checkBoxChange}
                /> Пометить событие как важное
              </Label>
            </FormGroup>
            <FormGroup>
              <Button
                onClick={() => this.addEvent()}
                style={{
                  marginTop: "2rem",
                  background: '#a9d85f',
                  border: 'none'
                }}
              >
                Готово
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  modalHandler: state.modalHandler
});

export default connect(
  mapStateToProps,
  dispatch => ({dispatch})
)(ItemModal);
