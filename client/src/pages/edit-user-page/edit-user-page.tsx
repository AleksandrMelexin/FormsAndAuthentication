import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Result, Space } from "antd";
import styles from "./edit-user-page.module.css";
import CreateEditForm from "@widgets/create-edit-form/";
import { emptyUser, type  IUser } from "@/entities/user/model/user-model";
import { userApi } from "@/entities/user/api";
import { useEffect, useState } from "react";

const { Title } = Typography;

const EditUserPage = () => {
  const [user, setUser] = useState<IUser>(emptyUser);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await userApi.getUserByID(id as string);
      if ('error' in res) {
        console.error(res.error);
      } else {
        setUser(res);
      }
    })();
  }, []);

  if (!("error" in user)) {
    return (
      <main className={styles.container}>
        <Space direction="vertical" className={styles.header}>
          <Title level={2} className={styles.title}>
            Редактирование пользователя
          </Title>
        </Space>
        {(user.name !== "") &&
        <div className={styles.formWrapper}>
          <CreateEditForm gotUser={user} action="edit" />
        </div>
        }
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
