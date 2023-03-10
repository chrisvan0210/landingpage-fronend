import nookies, { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";

const WithAuth = (WrappedComponent: any) => {
  const MyComp = (props: any) => {
    const router = useRouter();
    const fromCookie = parseCookies();
    if (typeof window !== "undefined") {
      if (!fromCookie || !fromCookie.authLDP) {
        router.push("/login");
      }
    } else {
      console.log("we are running on the server");
    }
    return <WrappedComponent {...props} />;
  };
  MyComp.displayName = "WithAuth";
  return MyComp;
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
