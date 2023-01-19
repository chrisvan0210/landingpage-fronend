import nookies, { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const fromCookie = parseCookies();
    

    if (typeof window !== "undefined") {
      if (!fromCookie || !fromCookie.auth) {
        router.push("/login");
      }
      // else if (fromCookie.auth){
      //   let currentTime = new Date();
      //   currentTime = currentTime.getTime();
      //   let expiresTime = fromCookie.auth;
      //   expiresTime = JSON.parse(expiresTime)
      //   if(currentTime>expiresTime){
      //     router.push("/login");
      //   }
      // }
    } else {
      console.log("we are running on the server");
    }


    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
