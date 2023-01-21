import {parseCookies} from 'nookies'

const userHook = () =>{
    const fromCookie =  parseCookies()
    let user;
    if(fromCookie && fromCookie.authLDP){
        user = fromCookie.authLDP;
        user = JSON.parse(user);
    }
        
    return {user}
}

export default userHook