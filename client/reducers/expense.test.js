import expenses from './expense'
import { SEND_EXPENSE, DELETE_EXPENSE } from '../actions'

test('SEND_EXPENSE adds expense to expense array', () => {
  const initialTestState = [{
    id: 200,
    amount: '300',
    name: 'Power bill',
    date: 1594938869,
    frequency: 'weekly',
    category: 'Utilities'
  }]

  const testAction = {
    type: SEND_EXPENSE,
    expense: {
      id: 666420,
      name: 'Food',
      amount: '150',
      category: 'Groceries',
      frequency: 'One off'
    }
  }
  const newState = expenses(initialTestState, testAction)

  expect(newState).toHaveLength(2)
  expect(newState[1].amount).toBe(150)
})

test('DELETE_EXPENSE deletes expense from expense array', () => {
  const initialTestState = [{
    id: 200,
    amount: '300',
    name: 'Power bill',
    date: 1594938869,
    category: 'Utilities',
    frequency: 'weekly'
  }]

  const testAction = {
    type: DELETE_EXPENSE,
    expense: {
      id: 666420,
      amount: '150',
      name: 'Food',
      category: 'Groceries',
      frequency: 'One off'
    }
  }

  const newState = expenses(initialTestState, testAction)

  expect(newState).toHaveLength(1)
  expect(newState[0].id).toBe(200)
})

test('default returns state', () => {
  // Arrage
  const initialTestState = [{
    id: 200,
    amount: '300',
    name: 'Power bill',
    date: 1594938869,
    category: 'Utilities',
    frequency: 'weekly'
  }]

  // Act
  const newState = expenses(initialTestState, 'default')

  // Assert
  expect(newState).toBe(initialTestState)
})
