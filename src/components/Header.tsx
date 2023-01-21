import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { HeaderWrapper } from "./styled";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import userHook from "hooks/userHook";
import { DoubleLeftOutlined } from "@ant-design/icons";

function Header() {
  const [auth, setAuth] = useState(null);
  const router = useRouter();
  const { user } = userHook();

  let isHome = router.pathname === "/" ? true : false;

    useEffect(() => {
        setAuth(user);
    }, []);

  const handleLogout = () => {
    //  Destroy
    destroyCookie(null, "authLDP");
    router.push("/login");
  };
  return (
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
  );
}

export default Header;
