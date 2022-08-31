
const storage = () => {
    function get(name: string) {
        return localStorage.getItem(name) === null ? {
            auth: {
                admin: {
                    uuid: undefined
                }
            }
        }
            : {
                auth: {
                    admin: {
                        uuid: '',
                        ...JSON.parse(JSON.stringify(localStorage.getItem(name)))
                    }
                }
            }

    }
    function set(key: string, value: string) {
        return localStorage.setItem(key, value)
    }

    function remove(name: string) {
        return localStorage.removeItem(name);
    }

    return {
        get: get,
        set: set,
        remove
    }

};



export default storage();