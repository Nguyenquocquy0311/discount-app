import { routes } from '@/constant/routes';
import Auth from '@/context/AuthContext';
import { resetPassword } from '@/services/auth';
import { Form, Input, Button, notification } from 'antd';
import { useRouter } from 'next/router';

const ResetPasswordForm = () => {
    const router = useRouter();
    const { token } = router.query;
    const { setIsOpenModalLogin } = Auth.useContainer();

    const onFinish = (values: any) => {
        resetPassword(token as string, values.password);

        notification.success({ message: 'Đặt lại mật khẩu thành công!' });
        router.push(routes.home);
        setIsOpenModalLogin(true);
    };

    const onFinishFailed = (errorInfo: any) => {
        notification.error({ message: 'Đặt lại mật khẩu thất bại. Vui lòng thử lại!' });
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="bg-white rounded-xl p-10">
            <h1 className="mb-6 text-2xl font-bold">Đặt lại mật khẩu</h1>
            <Form
                name="forgotPasswordForm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="password"
                    // label="Mật khẩu mới"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                    ]}
                >
                    <Input.Password placeholder="Mật khẩu mới" className="rounded-xl h-10 px-4" />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button type="primary" htmlType="submit" className="w-full h-10 rounded-lg">
                        Đặt lại mật khẩu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ResetPasswordForm;