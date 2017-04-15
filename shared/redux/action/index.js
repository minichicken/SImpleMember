import * as types from './ActionTypes';

export function produce(member) {
    return {
        type: types.PRODUCE,
        member,
    };
}

export function removal(id) {
    return {
        type: types.REMOVAL,
        id,
    };
}

export function searchMember(member) {
    return {
        type: types.SEARCHMEMBER,
        member,
    }
}

export function retitle(title) {
    return {
        type: types.RETITLE,
        title,
    };
}