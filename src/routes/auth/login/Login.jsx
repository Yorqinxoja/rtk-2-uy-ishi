import React, { useEffect } from "react";
import { Button, Form, Input, Typography, notification, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../../redux/api/authApi";
import { logIn } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logInRequest, { data, isSuccess }] = useLogInMutation();

  const onFinish = (values) => {
    logInRequest(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        logIn({
          token: data.payload.token,
          username: data.payload.username,
          email: data.payload.email,
        })
      );
      notification.success({
        message: "Successfully logged in! Go ahead 😊",
      });
      navigate("/profile");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Form
          className="login-form"
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Title level={2} className="login-title text-center">
            Login
          </Title>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>

          <Text>
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-link">
              Sign Up
            </Link>
          </Text>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
