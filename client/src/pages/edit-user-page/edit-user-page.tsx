import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Result, Space } from "antd";
import styles from "./edit-user-page.module.css";
import CreateEditForm from "@widgets/create-edit-form/";
import { mockUsers } from "@/entities/user/model/mock-users";
import { type  IUser } from "@/entities/user/model/user-model";
import { useState } from "react";

const { Title } = Typography;

const EditUserPage = () => {
  const [users, setUsers] = useState<IUser[]>(mockUsers);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = users.find((user) => user.id === id);

  if (user) {
    return (
      <main className={styles.container}>
        <Space direction="vertical" className={styles.header}>
          <Title level={2} className={styles.title}>
            Редактирование пользователя
          </Title>
        </Space>
        <div className={styles.formWrapper}>
          <CreateEditForm gotUser={user} action="edit" />
        </div>
      </main>
    );
  } else {
    return (
      <main className={styles.notFoundContainer}>
        <Result
          status="404"
          title={`Пользователь не найден`}
          subTitle="Извините, запрошенный пользователь не существует или был удален"
          extra={
            <Button
              type="primary"
              onClick={() => navigate("/")}
              className={styles.homeButton}
            >
              Вернуться на главную
            </Button>
          }
        />
      </main>
    );
  }
};

export default EditUserPage;
