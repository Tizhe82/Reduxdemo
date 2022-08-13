const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

//console.log('From index.js')

// DECLARING AN ACTION AND INDICATING THE TYPE 
// THE ACTION IS DECLARED USING AN OBJECT
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM '

function buyCake(){
    return{
        type:BUY_CAKE,
        info:'First redux action'
    }
}

function buyIceCream(){
    return{
        type:BUY_ICECREAM
    }
}

//Reducers
// (PreviousState, action) => newState

// const initialState = {
//     numberofCakes:10,
//     numberofIcecreams:20
// }

const initialCakeState = {
    numberofCakes: 10
}
const initialIcecreamState = {
    numberofIceCreams: 20
}

const iceCreamreducer = (state = initialIcecreamState, action) =>{
    switch(action.type){

        case BUY_ICECREAM: return{
            ...state,  
            numberofIceCreams: state.numberofIceCreams -  1
        }
        default: return state
    }
}

const cakeReducer = (state = initialCakeState, action) =>{
    switch(action.type){
        case BUY_CAKE: return{
            ...state,  
            numberofCakes: state.numofCakes -1
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamreducer
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('initial state', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()