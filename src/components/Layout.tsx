import { useRouter } from "next/router";
import React from "react";
import Header from "./Header";
import { PageContainer } from "./styled";

function Layout({ children }: any) {
  const router = useRouter();
  let isLogin = router.pathname === "/login" ? true : false;
  return (
    <>
      {!isLogin && <Header />}
      <PageContainer>{children}</PageContainer>
    </>
  );
}

export default Layout;
