import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';
import { GoogleOutlined, LoadingOutlined } from '@ant-design/icons';
import Auth from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { routes } from '@/constant/routes';

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

const LoginForm: React.FC = () => {
  const { isLoadingGoogleLogin } = Auth.useContainer();
  const router = useRouter()

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const returnUrl = router.query.returnUrl as string || routes.home;

  const onFinish = (values: FieldType) => {
    console.log('Form submitted:', values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Form submission failed:', errorInfo);
  };

  // const handleLoginWithGoogle = () => {
  //   loginWithGoogle()
  //     .then(() => {
  //       router.push(returnUrl);
  //     })
  //     .catch(() => {});
  // };

  return (
    <Form
      name="loginForm"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-[400px] rounded-lg shadow-lg p-6 bg-white border border-blue-300"
    >
      <h2 className="text-center font-bold text-2xl mb-8 text-blue-600">Đăng nhập</h2>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { pattern: emailRegex, message: 'Email không hợp lệ!' },
        ]}
      >
        <Input className="rounded-lg" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password className="rounded-lg" />
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>

      <div className="grid grid-flow-col space-x-20 mb-4">
        <Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
          <Checkbox>Nhớ mật khẩu</Checkbox>
        </Form.Item>
        <Link href="/signup" className="text-blue-500 hover:underline">
          Chưa có tài khoản?
        </Link>
      </div>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-blue-400"></div>
        <span className="mx-4 text-gray-500">Hoặc</span>
        <div className="flex-grow border-t border-blue-400"></div>
      </div>

      {/* <div className="flex justify-center my-6">
        <Button type="default" className="w-full flex items-center justify-center space-x-3 py-5 text-blue-500 rounded-lg" onClick={handleLoginWithGoogle}>
          {isLoadingGoogleLogin ? <LoadingOutlined /> : <GoogleOutlined />}
          <span>Đăng nhập với Google</span>
        </Button>
      </div> */}
    </Form>
  );
};

export default LoginForm;
