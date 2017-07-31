function Store() {
  let reducer = null
  let state = null

  function createStore(newReducer, initialState) {
    reducer = newReducer
    state = initialState
    return this
  }

  function dispatch(action) {
    const newState = reducer(state, action)
    console.log('dispatching:', action.type, 'prevState:', state, 'nextState:', newState)
    if (newState !== state) {
      state = newState
    }
  }

  return {
    createStore,
    dispatch,
  }
}

export default Store()
