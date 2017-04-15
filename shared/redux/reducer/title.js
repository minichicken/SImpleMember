import * as types from '../action/ActionTypes';

const initialState = {
    title: 'TodoApp'
};

export default function title(state = initialState, action) {
    switch(action.type){
        case types.RETITLE:
            return {
                title: action.title,
            }
        default:
            return initialState;
    }
}