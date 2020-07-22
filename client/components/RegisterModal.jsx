import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form, OverlayTrigger, Popover } from 'react-bootstrap'

import { register } from '../actions'

class RegisterModal extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameError: false,
    emailError: false,
    passwordError: false
  }

  handleChange = evt => {
    const { name, value } = evt.target
    if (name === 'username') {
      if (value.split('').length < 3) {
        this.setState({
          usernameError: true
        })
      } else {
        this.setState({
          usernameError: false
        })
      }
    }

    if (name === 'email') {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        console.log('hello')
        this.setState({
          emailError: true
        })
      } else {
        this.setState({
          emailError: false
        })
      }
    }

    if (name === 'password') {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(value)) {
        this.setState({
          passwordError: true
        })
      } else {
        this.setState({
          passwordError: false
        })
      }
    }

    this.setState({
      [name]: value
    })
  }

  submitHandler (evt) {
    evt.preventDefault()
    if (!this.state.usernameError && !this.state.emailError && !this.state.passwordError) {
      this.props.dispatch(register(this.state))
    }
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
          <Modal.Title id="contained-modal-title-vcenter">
          Create account
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.submitHandler(evt)}>
          <Modal.Body>
            <OverlayTrigger
              data-trigger="hover focus"
              placement="left"
              overlay={<Popover id="popover-basic">
                <Popover.Title as="h3">Username</Popover.Title>
                <Popover.Content>Please enter a <strong>Username</strong></Popover.Content>
              </Popover>}>
              <Form.Group>
                <Form.Label htmlFor='username' aria-label='username'>Username</Form.Label>
                <Form.Control
                  aria-label='enter username here'
                  type="text"
                  placeholder="Choose a username"
                  name='username'
                  value={this.state.username}
                  onChange={this.handleChange} />
                {this.state.usernameError && <Form.Text className="text-muted">Username needs to be greater than 2 charaters.</Form.Text>}
              </Form.Group>

            </OverlayTrigger>

            <OverlayTrigger
              data-trigger="hover focus"
              placement="left"
              overlay={<Popover id="popover-basic">
                <Popover.Title as="h3">Email Address</Popover.Title>
                <Popover.Content>Please enter your <strong>Email Address</strong></Popover.Content>
              </Popover>}>
              <Form.Group>
                <Form.Label htmlFor='email' aria-label='email'>Email address</Form.Label>
                <Form.Control
                  aria-label='enter email here'
                  type="email"
                  placeholder="Enter email"
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange} />
                {this.state.emailError && <Form.Text className="text-muted">Please enter a valid email address.</Form.Text>}
              </Form.Group>
            </OverlayTrigger>

            <OverlayTrigger
              data-trigger="hover focus"
              placement="left"
              overlay={<Popover id="popover-basic">
                <Popover.Title as="h3">Password</Popover.Title>
                <Popover.Content>Please enter a <strong>Password</strong>. Your password requires at least one capital case letter, one lower case letter, one number and one symbol. The password must be at least 8 characters long.</Popover.Content>
              </Popover>}>
              <Form.Group>
                <Form.Label htmlFor='password' aria-label='password'>Password</Form.Label>
                <Form.Control
                  aria-label='enter password here'
                  type="password"
                  placeholder="Password"
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange} />
                {this.state.passwordError && <Form.Text className="text-muted"> Please enter a password that has a length of 8 characters and includes at least one capital case letter, one lower case letter and one number.</Form.Text>}
              </Form.Group>
            </OverlayTrigger>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide} type="submit">Register</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.newClient
  }
}

export default connect(mapStateToProps)(RegisterModal)
