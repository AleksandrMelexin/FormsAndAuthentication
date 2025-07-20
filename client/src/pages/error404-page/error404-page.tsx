import { useNavigate } from "react-router-dom";
import { Result, Button, Typography, Space } from "antd";
import styles from "./error404-page.module.css";

const { Title, Text } = Typography;

const Error404Page = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title={<Title level={2}>Страница не найдена</Title>}
        subTitle={
          <Text type="secondary">
            Ошибка 404 - запрашиваемая страница не существует или была удалена
          </Text>
        }
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => navigate("/")}
              className={styles.button}
            >
              Вернуться на главную
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className={styles.button}
            >
              Обновить страницу
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default Error404Page;
