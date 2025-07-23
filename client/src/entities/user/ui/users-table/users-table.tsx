import { Table } from 'antd';
import type { IUser } from "@/entities/user/model/user-model";
import { useState } from "react";
import styles from "./users-table.module.css";
import { useNavigate } from 'react-router-dom';

interface UsersTableProps {
    gotUsers: IUser[];
}
const UsersTable = ({ gotUsers }: UsersTableProps) => {
  const [users, setUsers] = useState<IUser[]>(
    gotUsers.map(user => ({ ...user, key: user.id }))
  );
  const navigate = useNavigate();
  const rowClickHandler = (record: IUser) => {
    return {
      onClick: () => navigate(`/user/${record.id}`),
    };
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'surName',
      key: 'surName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ]
  return (
    <Table 
      columns={columns} 
      dataSource={users} 
      onRow={rowClickHandler}
      pagination={{
        pageSize: 20,
        showSizeChanger: false, 
      }}
    />
  );
};

export default UsersTable;
