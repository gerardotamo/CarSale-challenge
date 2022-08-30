import { User } from "../contexts/provider.types";

const storage = () => {
    function get(name: string) {
        return localStorage.getItem(name) === null ? {
            auth: {
                admin: {}
            }
        }
            : {
                auth: {
                    admin: JSON.stringify(localStorage.getItem(name))
                }
            }

    }
    function set(key: string, value: string) {
        return localStorage.setItem(key, value)
    }

    return {
        get: get,
        set: set
    }

};



export default storage();