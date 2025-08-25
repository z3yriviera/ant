import { Button, Divider, Form, Input, message, Typography } from "antd";
import { GoogleOutlined, FacebookFilled, TwitterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    message.success("Login Successful");
    navigate("/homepage");
  };

  return (
    <div className="loginContainer">
      <Form className="loginForm" onFinish={onFinish}>
        <Typography.Title className="formTitle" level={2}>
          Welcome Back!
        </Typography.Title>

        <Form.Item
          name="myEmail"
          rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="myPassword"
          rules={[
            { required: true, message: "Please enter your password" },
            () => ({
              validator(_, value) {
                if (!value) return Promise.reject("Please enter your password");
                const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
                return regex.test(value)
                  ? Promise.resolve()
                  : Promise.reject(
                      "Password must be at least 8 characters, include 1 uppercase letter and 1 special character"
                    );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button htmlType="submit" block className="customButton">
          Login
        </Button>

        <Divider>or Login with</Divider>

        <div className="socialLogin">
          <GoogleOutlined className="socialIcon" onClick={onFinish} />
          <FacebookFilled className="socialIcon" onClick={onFinish} />
          <TwitterOutlined className="socialIcon" onClick={onFinish} />
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <span>
            Don’t have an account?{" "}
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
