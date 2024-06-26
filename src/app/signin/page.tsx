"use client";
import { Form, Input, Select, Button, Typography, Card, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const { Title } = Typography;
const { Option } = Select;

const SigninForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/signin", values);
      message.success("Signup successful!");
      const { token, user } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      form.resetFields();
      console.log(response);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || "Signin failed!");
      } else {
        message.error("Signup failed!");
      }
    }
  };

  return (
    <Card
      title="Sign In"
      style={{
        maxWidth: 400,
        margin: "auto",
        marginTop: 20,
        boxShadow: "0 4px 8px rgba(0, 300, 0, 0.5)",
      }}
    >
      <Form
        form={form}
        name="signin"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        size="large"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email address!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
          hasFeedback
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" block>
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        Dont have an account? <a href="/signup">Sign Up</a>
      </div>
    </Card>
  );
};

export default SigninForm;
