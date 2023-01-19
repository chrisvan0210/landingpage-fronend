import {parseCookies} from 'nookies'

const userHook = () =>{
    const fromCookie =  parseCookies()
        let user = fromCookie.auth;
    return {user}
}

export default userHook