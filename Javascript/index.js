// select dom element 
const incrementInput = document.querySelector(".increment_input");
const decrementInput = document.querySelector(".decrement_input");
const score = document.querySelector(".match_score");
const resetBtn = document.querySelector(".reset_btn")

// Initial state 
const initialState = {
    match1: 50,
}

// action types
const MATCH_1_INCREMENT = "match_1_increment";
const MATCH_1_DECREMENT = "match_1_decrement";
const MATCH_1_RESET = "match_1_reset";


// action
const match_1_increment = (data) => {
    return {
        type: MATCH_1_INCREMENT,
        payload: data,
    }
}
const match_1_decrement = (data) => {
    return {
        type: MATCH_1_DECREMENT,
        payload: data,
    }
}
const match_1_reset = () => {
    return {
        type: MATCH_1_RESET,
    }
}


// create match Reducer
const matchReducer = (state = initialState, action) => {
    switch (action.type) {
        case MATCH_1_INCREMENT:
            return {
                ...state,
                match1: state.match1 + action.payload,
            }
        case MATCH_1_DECREMENT:
            return {
                ...state,
                match1: (state.match1 - action.payload) >= 0 ? (state.match1 - action.payload) : 0
            }
        case MATCH_1_RESET:
            return {
                ...state,
                match1: 0
            }

        default:
            return state;
    }
}

// create redux store 
const store = Redux.createStore(matchReducer)


//Render match 1 function
const render = () => {
    const { match1 } = store.getState();
    score.innerHTML = match1
}
render()

// store lessening
store.subscribe(render)

// handle score increment function
incrementInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        const addScoreInput = parseInt(incrementInput.value);
        store.dispatch(match_1_increment(addScoreInput))
        incrementInput.value = "";
    }
})

// handle score decrement function
decrementInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        const DEScoreInput = parseInt(decrementInput.value);
        store.dispatch(match_1_decrement(DEScoreInput))
        decrementInput.value = "";
    }
})

//reset all match score handel
resetBtn.addEventListener("click", () => store.dispatch(match_1_reset()))