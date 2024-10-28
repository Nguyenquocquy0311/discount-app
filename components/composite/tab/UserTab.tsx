import { Button, Input, Modal, Form, notification, Select } from "antd";
import { useEffect, useState } from "react";
import UserTable from "../table/UserTable";
import { UserResponse } from "@/types/user";
import { getListAccount } from "@/services/user";

export default function UserTab() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getListAccount();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      notification.error({ message: "Failed to fetch users" });
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        username: selectedUser.username,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role.roleName,
      });
    } else {
      form.resetFields();
    }
  }, [selectedUser, form]);

  const showModal = (user?: UserResponse) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      setSelectedUser(null);
      setIsEditMode(false);
    }
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: UserResponse) => {
    try {
      if (isEditMode && selectedUser) {
        // TODO: Implement API call to update user
        // For now, we'll update the local state
        setUsers((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id ? { ...selectedUser, ...values } : user
          )
        );
        notification.success({ message: "Người dùng đã được chỉnh sửa!" });
      } else {
        // TODO: Implement API call to add new user
        // For now, we'll update the local state
        const newUser = { ...values, id: Date.now() };
        setUsers((prev) => [...prev, newUser]);
        notification.success({ message: "Người dùng mới đã được thêm!" });
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      notification.error({ message: "Failed to submit form" });
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      // TODO: Implement API call to delete user
      // For now, we'll update the local state
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      notification.success({ message: "Người dùng đã được xoá!" });
    } catch (error) {
      console.error('Error deleting user:', error);
      notification.error({ message: "Failed to delete user" });
    }
  };

  return (
    <div className="bg-white px-10 h-full rounded-t-xl">
      {/* Header */}
      <div className="grid grid-flow-col justify-between py-5">
        <h1 className="font-sans mb-4">Có tất cả {filteredUsers.length} bản ghi</h1>

        {/* Search Input */}
        <Input.Search
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />

        {/* Add User Button */}
        <Button type="primary" onClick={() => showModal()}>
          Thêm mới
        </Button>
      </div>

      {/* User Table with View, Edit, Delete options */}
      <UserTable
        users={filteredUsers}
        onView={(user) => showModal(user)}
        onDelete={(userId) => handleDelete(userId)}
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={isEditMode ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input the username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select the role!' }]}
          >
            <Select>
              <Select.Option value="ADMIN">Admin</Select.Option>
              <Select.Option value="MANAGER">Manager</Select.Option>
              <Select.Option value="USER">User</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
