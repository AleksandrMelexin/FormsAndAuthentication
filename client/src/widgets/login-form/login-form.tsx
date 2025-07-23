import { serverApi } from "@/shared/api";
import styles from "./login-form.module.css";
import { Form, Input, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/shared/store/slices/server";

const LoginForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitHandler = async () => {
        const res = await serverApi.auth("admin@inno.tech", "admin");
        //const res = serverApi.auth(form.getFieldValue('email'), form.getFieldValue('password'));
        if ("error" in res) {
            console.error(res.error);
          } else {
            if (res.status === 201) {
              dispatch(setAuth(true));
              navigate("/");
            }
        }
    };
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={submitHandler}
            className={styles.form}
        >
            <Form.Item
                label="логин"
                name="email"
                rules={[{ required: true, message: "Пожалуйста, введите логин", type: "email" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="пароль"
                name="password"
                rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
            >
                <Input.Password />
            </Form.Item>
            <Space className={styles.submit}>
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
            </Space>
        </Form>
    );
};

export default LoginForm;
