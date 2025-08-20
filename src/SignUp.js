import { Button, Divider, Form, Input, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const newUser = {
      fullName: values.fullName,
      email: values.myEmail,
      password: values.myPassword,
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    message.success("Sign Up Successful");
    navigate("/login");
  };

  return (
    <div className="formContainer">
      <Form className="loginForm" onFinish={onFinish} key="signup">
        <Typography.Title className="formTitle" level={2}>
          Create Your Account
        </Typography.Title>

        <Form.Item
          rules={[{ required: true, message: "Please enter your name"}]}
          label="Full Name"
          name="fullName"
        >
          <Input placeholder = "Enter your full name" />

        </Form.Item>

        <Form.Item
          rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
          label="Email"
          name="myEmail"
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: "Please enter your password" },
            () => ({
              validator(_, value) {
                if (!value)
                  return Promise.reject(new Error("Please enter your password"));
                const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
                return regex.test(value)
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        "Password must be at least 8 characters, include 1 uppercase letter and 1 special character"
                      )
                    );
              },
            }),
          ]}
          label="Password"
          name="myPassword"
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("myPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
          label="Confirm Password"
          name="confirmPassword"
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Button htmlType="submit" block className="customButton">
          Sign Up
        </Button>

        <Divider style= {{borderColor: "pink"}}>or</Divider>

        <div style={{marginTop: 20, textAlign: "center"}}>
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