import { User } from './provider.types'


export enum Type {
    LOGIN = 'APP_LOGIN',
    LOGOUT = 'APP_LOGOUT'
}

export interface Action {
    type: Type,
    payload: User | undefined 
}