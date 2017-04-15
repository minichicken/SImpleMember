import update from 'react-addons-update';
import * as types from '../action/ActionTypes';

const initialState = {
    members: [],
    search: '',
};

export default function manager(state = initialState, action) {
    switch (action.type) {
        case types.PRODUCE:
            return {
                ...state,
                members: update(state.members, { $push: [action.member] })
            }
        case types.REMOVAL:
            return {
                ...state,
                members: update(state.members, { $splice: [[action.id, 1]] })
            }
        case types.SEARCHMEMBER:
            return {
                ...state,
                search: update(state.search, { $set: action.member })
            }
        default:
            return initialState;
    }
}