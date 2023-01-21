import nookies, { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";

const WithAuth = (WrappedComponent: any) => {
  const router = useRouter();
  const fromCookie = parseCookies();
  const MyComp = (props:any) => {
    if (typeof window !== "undefined") {
      if (!fromCookie || !fromCookie.authLDP) {
        router.push("/login");
      }
    } else {
      console.log("we are running on the server");
    }
    return <WrappedComponent {...props} />;
  }
  MyComp.displayName = 'WithAuth';
};

export default WithAuth;
// const HOC = (WC:any) => {
//   const MyComp = (props:any) => {
//     return (
//         <WC {...props} />
//       );
//   }
//   MyComp.displayName = 'test'
//   return MyComp;
// }