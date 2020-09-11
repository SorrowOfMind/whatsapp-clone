import {useState, useEffect} from 'react';

const useLS = (key, initVal) => {
    const [val, setVal] = useState(() => {
        const jsonVal = localStorage.getItem(key);
        if (jsonVal != null) return JSON.parse(jsonVal);
        if (typeof initVal === 'function') return initVal();
        else return initVal;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(val))
    }, [val, key]);

    return [val, setVal];
}

export default useLS;
