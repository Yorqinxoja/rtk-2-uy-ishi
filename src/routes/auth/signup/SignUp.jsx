import { Button, Form, Input, Typography, notification, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signUp } from "../../../redux/slices/authSlice";
import { useSignUpMutation } from "../../../redux/api/authApi";

const { Title, Text } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpRequest, { data, isSuccess }] = useSignUpMutation();

  const onFinish = (values) => {
    signUpRequest(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(signUp({ token: data.payload.token }));
      notification.success({
        message: "Successfully signed up! Go ahead 😊",
      });
      navigate("/profile");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={18} md={12} lg={8}>
        <Form
          className="custom-signup-form p-4"
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Title level={2} className="text-center">
            Sign Up
          </Title>

          <Form.Item
            label="Firstname"
            name="first_name"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input placeholder="Enter your firstname" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Photo URL"
            name="photo_url"
            rules={[
              { required: true, message: "Please input your photo URL!" },
            ]}
          >
            <Input type="url" placeholder="Enter your photo URL" />
          </Form.Item>

          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>

          <Text>
            Already have an account?{" "}
            <Link to="/auth/login" className="text-link">
              Log in
            </Link>
          </Text>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
