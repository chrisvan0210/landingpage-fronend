import {parseCookies} from 'nookies'

const userHook = () =>{
    const fromCookie =  parseCookies()
    let user
    if(fromCookie && fromCookie.auth){
        user = fromCookie.auth;
        user = JSON.parse(user);
    }
        
    return {user}
}

export default userHook