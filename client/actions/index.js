import { dispatch } from "d3"

import { newClient, login } from '../api'

export const SEND_INCOME = 'SEND_INCOME'
export const NEW_REGISTER_SENDING = 'NEW_REGISTER_SENDING'
export const NEW_REGISTER_SUCCESS = 'NEW_REGISTER_SUCCESS'
export const SIGNING_IN = 'SIGNING_IN'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'

export function sendIncomeToStore (income) {
  return {
    type: SEND_INCOME,
    income
  }
}

export const SEND_EXPENSE = 'SEND_EXPENSE'

export function sendExpenseToStore (expense) {
  return {
    type: SEND_EXPENSE,
    expense
  }
}

export function newRegister () {
  return {
    type: NEW_REGISTER_SENDING
  }
}

export function newRegisterSuccess (res) {
  return {
    type: NEW_REGISTER_SUCCESS,
    res
  }
}

export function register (form) {
  console.log('actions.index.js', form)
  return (dispatch) => {
    dispatch(newRegister())

    return newClient(form)
      .then(res => dispatch(newRegisterSuccess(res)))
  }
}

export function signingIn () {
  return {
    type: SIGNING_IN
  }
}

export function signInSuccess (res) {
  return {
    type: SIGN_IN_SUCCESS,
    res
  }
}

export function signIn (form) {
  console.log('actions.index.js', form)
  return (dispatch) => {
    dispatch(signingIn())

    return login(form)
      .then(res => dispatch(signInSuccess(res)))
  }
}
