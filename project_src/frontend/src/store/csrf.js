import Cookies from "js-cookie";


export const csrfFetch = async (url, options = {}) => {
    //? set options.method to 'GET' if no method is passed in
    options.method = options.method || 'GET';

    //? set options.headers to an empty pojo if no headers.
    options.headers = options.headers || {};

    //? if the options.method is not 'GET, then set the 'Content-Type' header to
    //? 'application/json', and set the 'XSRF-TOKEN' header to the value of the
    //? 'XSRF-TOKEN' cookie
    if(options.method.toUpperCase() !== 'GET'){
        if(options.headers['Content-Type'] === 'multipart/form-data'){
            delete options.headers['Content-Type'];
        }
        else{

            options.headers['Content-Type'] =
                options.headers['Content-Type'] || 'application/json';
                
            }
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    const res = await window.fetch(url, options);

    if(res.status >= 400) throw res;

    return res;
}

export const restoreCSRF = () => {
    return csrfFetch('/api/csrf/restore');
}
