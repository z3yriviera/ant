import { Button, Divider, Form, Input, message, Typography } from "antd";
import { GoogleOutlined, FacebookFilled, TwitterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    message.success("Sign Up Successful");
    navigate("/login");
  };

  return (
    <div className="loginContainer">
      <Form className="loginForm" onFinish={onFinish}>
        <Typography.Title className="formTitle" level={2}>
          Create Your Account
        </Typography.Title>

        <Form.Item name="fullName" rules={[{ required: true, message: "Enter your name" }]}>
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="myEmail"
          rules={[{ required: true, type: "email", message: "Enter valid email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="myPassword"
          rules={[{ required: true, message: "Enter password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["myPassword"]}
          rules={[
            { required: true, message: "Confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("myPassword") === value) return Promise.resolve();
                return Promise.reject("Passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Button htmlType="submit" block className="customButton">
          Sign Up
        </Button>

        <Divider>or Sign Up with</Divider>

        <div className="socialLogin">
          <GoogleOutlined className="socialIcon" onClick={onFinish} />
          <FacebookFilled className="socialIcon" onClick={onFinish} />
          <TwitterOutlined className="socialIcon" onClick={onFinish} />
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <span>
            Already have an account?{" "}
            <Button type="link" onClick={() => navigate("/login")}>
              Login
            </Button>
          </span>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
