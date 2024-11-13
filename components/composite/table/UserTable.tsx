import { Button, Table, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { UserResponse } from "@/types/user";

interface UserTableProps {
  users: UserResponse[];
  onView: (user: UserResponse) => void;
  onDelete: (userId: number) => void;
  loading: boolean;
}

export default function UserTable({ users, onView, onDelete, loading }: UserTableProps) {

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: { roleName: string }) => {
        let color = 'blue';
        if (role.roleName === 'ADMIN') {
          color = 'red';
        } else if (role.roleName === 'MANAGER') {
          color = 'green';
        }
        return (
          <Tag color={color}>
            {role.roleName}
          </Tag>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (text: any, user: UserResponse) => (
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

  return <Table columns={columns} dataSource={users} rowKey="id" loading={loading} />;
}
