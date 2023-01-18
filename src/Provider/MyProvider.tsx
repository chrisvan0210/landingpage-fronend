import React,{useEffect, useState} from "react";

interface UserType {
    user : object | null,
    setUser : (u:object)=>void
}


export const UserContext = React.createContext<UserType|null>(null);

function MyProvider(props:any) {
  const [user, setUser] = useState<UserType|null>(null);
  useEffect(()=>{
    if(localStorage.getItem("user")){
        let item = localStorage.getItem("user");
        setUser(JSON.parse(item));
     }
  },[])

if (typeof window !== 'undefined') {
    console.log('we are running on the client')
} else {
    console.log('we are running on the server');
}
console.log("2",user)
  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  );
}
export default MyProvider;