import { Button } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HeaderWrapper } from "./styled";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import userHook from "hooks/userHook";
import { DoubleLeftOutlined } from "@ant-design/icons";

function Layout({ children }: any) {
  const [auth, setAuth] = useState();
  const router = useRouter();
  const { user } = userHook();
  
  let isHome = router.pathname === "/" || "/login"? true : false;
  const handleLogout = () => {
    //  Destroy
    destroyCookie(null, "auth");
    router.push("/login");
  };
  useEffect(() => {
    setAuth(user);
  }, []);
  
  return (
    <div>
      <HeaderWrapper>
        {isHome ? (
            <div className="user-name">ADMIN</div>
        ) : (
            <div className="edit_header">
            <Button type="primary" onClick={() => router.push("/")}>
              <DoubleLeftOutlined />
              Home Page
            </Button>
          </div>
        )}

        <div className="header-right">
          {auth ? (
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button type="primary">
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
        </div>
      </HeaderWrapper>
      {children}
    </div>
  );
}

export default Layout;
