import { Button, Checkbox, Form, Input, Modal, notification } from "antd";
import React, { useEffect } from "react";
import Link from "next/link";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import Auth from "@/context/AuthContext";
import { routes } from "@/constant/routes";
import { useRouter } from "next/router";

type FieldType = {
  username: string;
  password: string;
  remember?: boolean;
};

export const LoginModal = () => {
  const { userInfo, loginWithGoogle, isLoadingGoogleLogin, isOpenModalLogin, closeModalLogin, loginWithJWT } = Auth.useContainer();
  const router = useRouter();

  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // const returnUrl = (router.query.returnUrl as string) || "/";

  const onFinish = async (values: FieldType) => {
    console.log("Form submitted:", values);

    const username = values.username;
    const password = values.password;

    await loginWithJWT(username, password);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log("Form submission failed:", errorInfo);

  };

  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then(() => {
        closeModalLogin();
        router.push(routes.home)
      })
      .catch(() => {
        // Xử lý lỗi khi đăng nhập Google thất bại
      });
  };
    
  useEffect(() => {
    if (userInfo) {
      closeModalLogin()
    }
  }, [userInfo])

  return (
    <Modal
      open={isOpenModalLogin}
      onCancel={closeModalLogin}
      centered
      footer={null}
      width={420}
      bodyStyle={{ padding: "32px 24px" }}
      className="rounded-lg shadow-lg"
    >
      <h2 className="text-center font-bold text-2xl mb-6 text-blue-600">Đăng nhập</h2>
      <Form
        name="loginForm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          // label={<span className="font-semibold text-blue-500">Email</span>}
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            // { pattern: emailRegex, message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Email" className="rounded-xl h-10 px-4" />
        </Form.Item>

        <Form.Item
          // label={<span className="font-semibold text-blue-500">Mật khẩu</span>}
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Mật khẩu" className="rounded-lg h-10 px-4" />
        </Form.Item>

        <Form.Item className="mb-2">
          <div className="flex justify-between">
            <Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ mật khẩu</Checkbox>
          </Form.Item>
          <Link href="/signup" className="text-blue-500 hover:underline">
            Chưa có tài khoản?
          </Link>
         </div>
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit" className="w-full h-10 rounded-lg">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">Hoặc</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex justify-center">
        <Button
          type="default"
          className="w-full h-12 rounded-lg flex items-center justify-center text-blue-500"
          onClick={handleLoginWithGoogle}
        >
          {isLoadingGoogleLogin ? <LoadingOutlined /> : <GoogleOutlined />}
          <span className="ml-2">Đăng nhập với Google</span>
        </Button>
      </div>
    </Modal>
  );
};
