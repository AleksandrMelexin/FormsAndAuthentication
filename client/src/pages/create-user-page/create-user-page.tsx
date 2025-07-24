import { Typography, Space } from "antd";
import styles from "./create-user-page.module.css";
import CreateEditForm from "@widgets/create-edit-form/";

const { Title } = Typography;

const CreateUserPage = () => {
  return (
    <main className={styles.container}>
      <Space direction="vertical" className={styles.header}>
        <Title level={2} className={styles.title}>
          Создание пользователя
        </Title>
      </Space>
      <div className={styles.formWrapper}>
        <CreateEditForm action="create" />
      </div>
    </main>
  );
};

export default CreateUserPage;