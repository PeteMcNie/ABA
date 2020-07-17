import { SEND_EXPENSE } from '../actions'

const initialState = [{
  name: 'Power bill',
  date: 1594938869,
  amount: 30.50,
  frequency: null,
  category: 'Utilities'
},
{
  name: 'Water bill',
  date: 1594938869,
  amount: 16.50,
  frequency: null,
  category: 'Utilities'
},
{
  name: 'Phone bill',
  date: 1594938869,
  amount: 20.00,
  frequency: null,
  category: 'Utilities'
},
{
  name: 'Countdown Ponsonby',
  date: 1594938869,
  amount: 80.50,
  frequency: null,
  category: 'Groceries'
},
{
  name: 'PaknSave Takapuna',
  date: 1594938869,
  amount: 55.50,
  frequency: null,
  category: 'Groceries'
},
{
  name: 'Rent',
  date: 1594938869,
  amount: 220.00,
  frequency: null,
  category: 'Accomodation'
},
{
  name: 'Netflix bill',
  date: 1594938869,
  amount: 20.50,
  frequency: null,
  category: 'Entertainment'
},
{
  name: 'Eating out with mates',
  date: 1594938869,
  amount: 40.90,
  frequency: null,
  category: 'Treats'
}]

function expenses (state = initialState, action) {
  switch (action.type) {
    case SEND_EXPENSE:
      return [...state, action.expense]

    default:
      return state
  }
}

export default expenses