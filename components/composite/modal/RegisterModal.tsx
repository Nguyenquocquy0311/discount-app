import { Button, Checkbox, Form, Input, Modal, notification } from "antd";
import React, { useEffect } from "react";
import Link from "next/link";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import Auth from "@/context/AuthContext";
import { routes } from "@/constant/routes";
import { useRouter } from "next/router";

type RegisterFieldType = {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  remember?: boolean;
};

export const RegisterModal = () => {
  const { userInfo, loading, isLoadingGoogleLogin, isOpenModalSignup, closeModalSignup, signupWithJWT } = Auth.useContainer();
  const router = useRouter();

  const onFinish = async (values: RegisterFieldType) => {
    console.log("Form submitted:", values);

    const { name, username, password, email } = values;

    if (password !== values.confirmPassword) {
      notification.error({
        message: 'Mật khẩu xác nhận không khớp!',
      });
      return;
    }

    await signupWithJWT(email, name, username, password);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log("Form submission failed:", errorInfo);
  };

  useEffect(() => {
    if (userInfo) {
      closeModalSignup();
    }
  }, [userInfo]);

  return (
    <Modal
      open={isOpenModalSignup}
      onCancel={closeModalSignup}
      centered
      footer={null}
      width={420}
      bodyStyle={{ padding: "32px 24px" }}
      className="rounded-lg shadow-lg"
    >
      <h2 className="text-center font-bold text-2xl mb-6 text-blue-600">Đăng ký</h2>
      <Form
        name="registerForm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Email" className="rounded-xl h-10 px-4" />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input placeholder="Tên người dùng" className="rounded-xl h-10 px-4" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input placeholder="Tên đăng nhập" className="rounded-xl h-10 px-4" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Mật khẩu" className="rounded-lg h-10 px-4" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu" className="rounded-lg h-10 px-4" />
        </Form.Item>

        <Form.Item className="mb-2">
          <div className="flex justify-between">
            <Form.Item<RegisterFieldType> name="remember" valuePropName="checked" noStyle>
              <Checkbox>Nhớ mật khẩu</Checkbox>
            </Form.Item>
            <div className="text-blue-500 hover:underline">
              Đã có tài khoản?
            </div>
          </div>
        </Form.Item>

        <Form.Item className="flex justify-center mt-6">
          <Button type="primary" htmlType="submit" className="w-full h-10 rounded-lg">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
