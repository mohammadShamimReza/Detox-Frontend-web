"use client";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiTask } from "react-icons/bi";
import { BsPostcard } from "react-icons/bs";
import { IoCashOutline, IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import siteLogo from "../../app/assets/detox1.png";
import FeedPost from "./homefeed/FeedPost";

const { Header, Content, Footer, Sider } = Layout;
const { Item } = Menu;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
};

function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const authItems: MenuItem[] = [
    {
      key: "1",
      label: <Link href="/">Home</Link>,
      icon: <IoHomeOutline size={20} />,
    },
    {
      key: "2",
      label: <Link href="/blog">Blog</Link>,
      icon: <BsPostcard size={20} />,
    },
    {
      key: "3",
      label: <Link href="/myTask">Task</Link>,
      icon: <BiTask size={20} />,
    },
    {
      key: "4",
      label: <Link href="/donation">Donation</Link>,
      icon: <IoCashOutline size={20} />,
    },
    {
      key: "5",
      label: <Link href="/profile">Profile</Link>,
      icon: <IoPersonOutline size={20} />,
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", borderRadius: "30px" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="flex flex-shrink-0 items-center justify-center text-lg font-bold mb-5">
          <Link href={"/"}>
            {" "}
            <Image src={siteLogo} width={70} alt="website logo" />
          </Link>
        </div>

        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          {authItems.map((item) => (
            <Item key={item.key} icon={item.icon}>
              {item.label}
            </Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="rounded-2xl">
        <Header
          style={{
            padding: 0,
            margin: 10,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="border rounded"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Link href={"/login"}>
            {" "}
            <button className={" px-3  text-black rounded  hover:bg-gray-100"}>
              <div className="flex items-center justify-center gap-1">
                <p>Login</p>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </button>
          </Link>
        </Header>
        <Content>
          <FeedPost />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Save Ummah ©{new Date().getFullYear()} Created by Shamim Reza
        </Footer>
      </Layout>
    </Layout>
  );
}

export default HomeLayout;
