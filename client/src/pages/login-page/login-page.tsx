import { Typography, Space } from "antd";
import styles from "./login-page.module.css";
import LoginForm from "@/widgets/login-form";

const { Title } = Typography;

const LoginPage = () => {
  return (
    <main className={styles.container}>
      <Space direction="vertical" className={styles.header}>
        <Title level={2} className={styles.title}>
          Войти
        </Title>
      </Space>
      <div className={styles.formWrapper}>
        <LoginForm/>
      </div>
    </main>
  );
};

export default LoginPage;