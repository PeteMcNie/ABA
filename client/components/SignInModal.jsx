import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form, Navbar } from 'react-bootstrap'

import { signIn } from '../actions'

class SignInModal extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = evt => {
    const { name, value } = evt.target
    this.setState({
      [name]: value
    })
  }

  submitHandler = evt => {
    evt.preventDefault()
    this.props.dispatch(signIn(this.state))
  }

  render () {
    const modalProps = Object.assign({}, this.props)
    delete modalProps.dispatch
    return (
      <Modal
        {...modalProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Navbar.Brand id='modal-logo'>Balance</Navbar.Brand>
          <Modal.Title id="contained-modal-title-vcenter">
          Sign In
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.submitHandler(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label htmlFor='insert username here'>Username</Form.Label>
              <Form.Control type="text" placeholder="Choose a username" name='username' value={this.state.username} onChange={this.handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor='insert password here'>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' value={this.state.password} onChange={this.handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide} type="submit">Sign In</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default connect()(SignInModal)
