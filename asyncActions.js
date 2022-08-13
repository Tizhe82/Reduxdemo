const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')


const initialState = { 
    loading: false, 
    users:[],
    error:''
}

const  FETCH_USERS_REQUEST =  'FETCH_USERS_REQUEST '
const FETCH_USERS_SUCCESS =  'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE =  'FETCH_USERS_FAILURE'

// Creating our action creators 

const fetchUsersRequest = () => {
    return{
        type: FETCH_USERS_REQUEST
    }
}
 // Second action is to store the list of users if the action was successful

 const fetchUsersSuccess = users => {
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
 } 

 //third action is to store an error message if the request failed

  const fetchUsersFailure = error => {
   return{
    type: FETCH_USERS_FAILURE,
    payload: error
   }
  }

  // defining our reducer function 

  const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
        return{
          ...state, 
          loading:true 
        }
        case FETCH_USERS_SUCCESS:
            return{
                loading: false,
                users: action.payload,
                error: ''
            }

            case FETCH_USERS_FAILURE:
                return{
                    loading:false, 
                    users:[],
                    error: action.payload
                }

    }
    
  } 

  const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest()) // it will basically set loading to true
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response =>{
            // response.data is the array of users
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error =>{
            //error.message
            dispatch(fetchUsersFailure(error.message))
        })
    }
  }

  const store = createStore(reducer, applyMiddleware(thunkMiddleware))

  //subscribing to the store
  store.subscribe(() =>{console.log(store.getState())})
  store.dispatch(fetchUsers())