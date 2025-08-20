import { Button, Divider, Form, Input, message, Typography } from "antd";
import { GoogleOutlined, FacebookFilled, TwitterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login (){
  const navigate =useNavigate();

  const onFinish = (values) => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      message.error("No user found! Please register first");
      return;
    }

    if (savedUser.email == values.myEmail && savedUser.password == values.myPassword){
      message.success("Login Successful");
      navigate("/homepage");
    }else {
      message.error("Invalid email or password")
    }
  };

return (
  <div className="formContainer">
    <Form className="loginForm" onFinish={onFinish} key="login">
      <Typography.Title className="formTitle" level={2}>
        Welcome Back!
      </Typography.Title>

      <Form.Item
        rules={[{ required: true, type: "email", message: "Please enter your email."}]}
        label="Email"
        name="myEmail"
      >
        <Input placeholder="Enter your email"/>
      </Form.Item>

      <Form.Item
          rules={[{ required: true, message: "Please enter your password" }]}
          label="Password"
          name="myPassword"
      >
        <Input.Password placeholder=" Enter your password"/>

      </Form.Item>
      <Button htmlType="submit" block className="customButton">
        Login
      </Button>

      <Divider style={{borderColor: "pink"}}>or</Divider>

      <div style={{ marginTop: 20, textAlign: "center"}}>
        <span>
          Don't have an account?{" "}
          <Button type="link" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        </span>

      </div>

    </Form>
  </div>
);
}
export default Login;