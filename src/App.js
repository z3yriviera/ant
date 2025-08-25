
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme, Switch, Layout } from "antd";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import "./App.css";
import React, { useState } from "react";


const { Header } = Layout;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const customTheme = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#ff69b4",
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Layout>
        <Header className="app-header">
          <div className="header-left">
            <h2 style={{ color: "#fff" }}>Ant Demo App</h2>
          </div>
          <div className="header-right">
            <span style={{ color: "#fff", marginRight: "10px" }}>
              {isDarkMode ? "Dark" : "Light"} Mode
            </span>
            <Switch
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </div>
        </Header>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
