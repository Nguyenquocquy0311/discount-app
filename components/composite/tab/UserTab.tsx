import { Button, Input, Modal, Form, notification } from "antd";
import { useState } from "react";
import UserTable, { User } from "../table/UserTable";

export default function UserTab() {
  // Initial user data
  const initialUsers: User[] = [
    { id: 1, username: 'johndoe', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, username: 'janesmith', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager' },
    { id: 3, username: 'boblee', name: 'Bob Lee', email: 'bob.lee@example.com', role: 'User' },
    { id: 4, username: 'lucysky', name: 'Lucy Sky', email: 'lucy.sky@example.com', role: 'Admin' },
    { id: 5, username: 'markbrown', name: 'Mark Brown', email: 'mark.brown@example.com', role: 'User' },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers); // Store user list
  const [searchTerm, setSearchTerm] = useState(""); // Store search term
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Store selected user for viewing/editing
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
  const [isEditMode, setIsEditMode] = useState(false); // Determine if it's edit or add mode

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showModal = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      setSelectedUser(null);
      setIsEditMode(false);
    }
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: User) => {
    if (isEditMode && selectedUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? { ...selectedUser, ...values } : user
        )
      );
      notification.success({ message: "Người dùng đã được chỉnh sửa!" });
    } else {
      // Add new user
      const newUser = { ...values, id: users.length + 1 };
      setUsers((prev) => [...prev, newUser]);
      notification.success({ message: "Người dùng mới đã được thêm!" });
    }
    setIsModalVisible(false);
  };

  // Handle user deletion
  const handleDelete = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    notification.success({ message: "Người dùng đã được xoá!" });
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
        onView={(user) => showModal(user)} // View/Edit user
        onDelete={(userId) => handleDelete(userId)} // Delete user
      />

      {/* Add/Edit Modal */}
      <Modal
        title={isEditMode ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={selectedUser || { username: '', name: '', email: '', role: '' }}
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
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select the role!' }]}
          >
            <Input />
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
