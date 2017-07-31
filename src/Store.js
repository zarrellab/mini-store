function Store() {
  let reducer = null
  let state = null

  function createStore(newReducer, initialState) {
    reducer = newReducer
    state = initialState
    return this
  }

  const listeners = []

  function subscribe(callback) {
    listeners.push(callback)
  }

  function dispatch(action) {
    const newState = reducer(state, action)
    console.log('dispatching:', action.type, 'prevState:', state, 'nextState:', newState)
    if (newState !== state) {
      state = newState
      listeners.forEach(listener => listener())
    }
  }

  function getState() {
    return state
  }

  return {
    createStore,
    subscribe,
    dispatch,
    getState,
  }
}

export default Store()
