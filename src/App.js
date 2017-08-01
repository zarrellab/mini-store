import { createStore, applyMiddleware } from 'redux'


const initialState = {
  eggsCount: 0,
  spamCount: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'EGGS':
      return { ...state, eggsCount: state.eggsCount + 1 }
    case 'SPAM':
      return { ...state, spamCount: state.spamCount + 1 }
    default:
      return state
  }
}

const logMiddleware = store => next => (action) => {
  console.log('prevState:', store.getState())
  console.log('dispatching:', action)
  const result = next(action)
  console.log('nextState', store.getState())
  return result
}

const store = createStore(reducer, initialState, applyMiddleware(logMiddleware))

document.querySelector('#eggs').onclick = () => store.dispatch({ type: 'EGGS' })
document.querySelector('#spam').onclick = () => store.dispatch({ type: 'SPAM' })

function updateView() {
  document.querySelector('#eggsCount').innerText = store.getState().eggsCount
  document.querySelector('#spamCount').innerText = store.getState().spamCount
}

store.subscribe(updateView)
