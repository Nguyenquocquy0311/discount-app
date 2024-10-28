import { Button, Form, Input, Modal, message } from "antd";
import React from "react";
import Auth from "@/context/AuthContext";
import { forgotPassword } from "@/services/auth";

type FieldType = {
    email: string;
};

export const ForgotPasswordModal = () => {
    const { isOpenModalForgotPassword, closeModalForgotPassword } = Auth.useContainer();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onFinish = async (values: FieldType) => {
        if (!emailRegex.test(values.email)) {
            message.error("Email không hợp lệ!");
            return;
        }

        const email = values.email;
        try {
            await forgotPassword(email);
            message.success("Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.");
            closeModalForgotPassword();
        } catch (error) {
            message.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Form submission failed:", errorInfo);
        message.error("Gửi yêu cầu thất bại!");
    };

    return (
        <Modal
            open={isOpenModalForgotPassword}
            onCancel={closeModalForgotPassword}
            centered
            footer={null}
            width={420}
            bodyStyle={{ padding: "32px 24px" }}
            className="rounded-lg shadow-lg"
        >
            <h2 className="text-center font-bold text-2xl mb-6 text-blue-600">Quên mật khẩu</h2>
            <Form
                name="forgotPasswordForm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: 'email', message: "Email không hợp lệ!" },
                    ]}
                >
                    <Input placeholder="Email" className="rounded-xl h-10 px-4" />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button type="primary" htmlType="submit" className="w-full h-10 rounded-lg">
                        Gửi yêu cầu đặt lại mật khẩu
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
