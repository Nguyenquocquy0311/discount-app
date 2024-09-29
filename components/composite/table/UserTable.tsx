import { Button, Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    role: 'Admin' | 'Manager' | 'User'
}

interface UserTableProps {
  users: User[];
  onView: (user: User) => void;
  onDelete: (userId: number) => void;
}

export default function UserTable({ users, onView, onDelete }: UserTableProps) {
  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Actions',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (text: any, user: User) => (
        <>
          <Button onClick={() => onView(user)} className="border-none">
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này không?"
            onConfirm={() => onDelete(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger className="border-none"><DeleteOutlined /></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey="id" />;
}
