import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Upload, notification } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { UploadFile, RcFile } from 'antd/lib/upload/interface';
import Auth from '@/context/AuthContext';
import { uploadAvatar, updateUserInfo } from '@/services/user';

const ProfileForm: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { userInfo, setUserInfo } = Auth.useContainer();
  const [form] = Form.useForm();

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        fullName: userInfo.name,
        email: userInfo.email,
      });

      if (userInfo.avatar) {
        setFileList([
          {
            uid: '-1',
            name: 'avatar.png',
            status: 'done',
            url: userInfo.avatar,
          } as UploadFile,
        ]);
      }
    }
  }, [userInfo, form]);

  const handleUpload = async (file: RcFile) => {
    setUploading(true);
    try {
      const updatedUser = await uploadAvatar(file);

      setFileList([
        {
          uid: '-1',
          name: file.name,
          status: 'done',
          url: updatedUser.avatar,
        },
      ]);

      notification.success({ message: 'Cập nhật ảnh đại diện thành công!' });
    } catch (error) {
      notification.error({ message: 'Cập nhật ảnh đại diện thất bại. Vui lòng thử lại!' });
    } finally {
      setUploading(false);
    }
  };

  const onFinish = async (values: { fullName: string; email: string }) => {
    try {
      const updatedUser = await updateUserInfo(values.fullName, values.email);
      setUserInfo(updatedUser);
      notification.success({ message: 'Cập nhật thông tin thành công!' });
    } catch (error) {
      notification.error({ message: 'Cập nhật thông tin thất bại. Vui lòng thử lại!' });
    }
  };

  return (
    <Form
      form={form}
      name="profile-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      onFinish={onFinish}
      autoComplete="off"
      className="pt-20 h-screen"
    >
      <h2 className="text-center text-2xl font-bold mb-10 mt-5">Cập nhật hồ sơ</h2>

      <Form.Item
        label="Tên đầy đủ"
        name="fullName"
        rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ!' }]}
      >
        <Input placeholder="Nhập tên đầy đủ" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Vui lòng nhập đúng định dạng email!' }]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        label="Ảnh đại diện"
        name="avatar"
      >
        <Upload
          name="avatar"
          fileList={fileList}
          accept="image/*"
          listType="picture-card"
          beforeUpload={(file) => {
            handleUpload(file);
            return false;
          }}
          onRemove={() => {
            setFileList([]);
          }}
        >
          {fileList.length === 0 && !uploading ? (
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          ) : (
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          )}
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Cập nhật hồ sơ
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
