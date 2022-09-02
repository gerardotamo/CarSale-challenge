import { Users } from '../graphql/__generate__/generated'

export enum Type {
    LOGIN = 'APP_LOGIN',
    LOGOUT = 'APP_LOGOUT'
}

export interface Action {
    type: Type,
    payload: Users | undefined 
}