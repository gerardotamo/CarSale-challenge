const storage = () => {
  function get(name: string) {
    return localStorage.getItem(name) === null
      ? {
          auth: {
            admin: {
              uuid: undefined,
            },
          },
        }
      : {
          auth: {
            admin: {
              uuid: '',
              ...JSON.parse(localStorage.getItem(name)?.toString() ?? ''),
            },
          },
        };
  }
  function set(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  function remove(name: string) {
    return localStorage.removeItem(name);
  }

  return {
    get,
    set,
    remove,
  };
};

export default storage();
