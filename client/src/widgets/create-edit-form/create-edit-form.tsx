import { v4 as uuidv4 } from "uuid";
import { emptyUser, type IUser } from "@/entities/user/model/user-model";
import styles from "./create-edit-form.module.css";
import { Form, Input, Button, DatePicker, Checkbox, Space, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectForm from "@/shared/ui/select-form";
import { PhoneOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { userApi } from "@/entities/user/api";

interface CreateEditFormProps {
    gotUser?: IUser;
    action: "edit" | "create";
}

const CreateEditForm = ({gotUser = emptyUser, action}: CreateEditFormProps) => {
    const isEdit = action === "edit";
    const [user, setUser] = useState<IUser>({
        ...gotUser,
        id: gotUser.id || uuidv4(),
        birthDate: gotUser.birthDate ? dayjs(gotUser.birthDate) : dayjs()
    })
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const showModal = () => {
        setOpen(true);
    };
    
    const hideModal = () => {
        setOpen(false);
    };

    const changeHandler = (name: string, value: string | boolean | Date | Dayjs) => {
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const submitEditHandler = async () => {
        const res = await userApi.updateUser(user);
        if (!res.success){
            const errorMessage = res.data?.message?.join(', ') ?? 'Unknown error';
            form.setFields([{
                name: 'submit',
                errors: [`Ошибка редактирования пользователя: ${errorMessage}`],
            }]);
        }
        else{
            navigate("/");
        }
    };

    const submitDeleteHandler = async () => {
        const res = await userApi.deleteUser(user.id);
        if (!res.success){
            const errorMessage = res.data?.message?.join(', ') ?? 'Unknown error';
            form.setFields([{
                name: 'submit',
                errors: [`Ошибка удаления пользователя: ${errorMessage}`],
            }]);
        }
        else{
            navigate("/");
        }
    };
    
    const submitCreateHandler = async () => {
        const res = await userApi.createUser(user);
        if (!res.success){
            const errorMessage = res.data?.message?.join(', ') ?? 'Неизвестная ошибка';
            form.setFields([{
                name: 'submit',
                errors: [`Ошибка создания пользователя: ${errorMessage}`],
            }]);
        }
        else{
            navigate("/");
        }
    };
    
    const submitHandler = () => {
        const currentUser = {
            ...user,
            name: form.getFieldValue("name"),
            surName: form.getFieldValue("surName"),
            password: form.getFieldValue("password"),
            fullName: form.getFieldValue("fullName"),
            email: form.getFieldValue("email"),
            birthDate: new Date(form.getFieldValue("birthDate")?.toDate()),
            telephone: form.getFieldValue("telephone"),
            employment: form.getFieldValue("employment"),
            userAgreement: form.getFieldValue("userAgreement"),
        };

        if (action === "edit") {
            submitEditHandler();
        } else {
            submitCreateHandler();
        }
    };
    return (
        <Form
            layout="vertical"
            onFinish={submitHandler}
            form={form}
            initialValues={user}
            className={styles.form}
        >
            <Form.Item
                label="Имя"
                name="name"
                rules={[{ required: true, message: "Введите имя" }]}
            >
                <Input
                    placeholder="Введите имя"
                    onChange={(e) => changeHandler("name", e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Фамилия"
                name="surName"
                rules={[{ required: true, message: "Введите фамилию" }]}
            >
                <Input
                    placeholder="Введите фамилию"
                    onChange={(e) => changeHandler("surName", e.target.value)}
                />
            </Form.Item>
            {(action === "create") &&
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: "Введите пароль" }]}
                >
                    <Input.Password
                        placeholder="Введите пароль"
                        onChange={(e) => changeHandler("password", e.target.value)}
                        disabled={isEdit}
                    />
                </Form.Item>
            }
            {(action === "create") &&
                <Form.Item
                    label="Подтвердите пароль"
                    name="confirmPassword"
                    dependencies={['password']} 
                    rules={[
                        { required: true, message: "Подтвердите пароль" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        }),
                    ]}
                    >
                    <Input.Password
                        placeholder="Повторите пароль"
                        disabled={isEdit}
                    />
                </Form.Item>     
            }               
            <Form.Item
                label="полное имя"
                name="fullName"
                rules={[{ required: true, message: "Введите полное имя" }]}
            >
                <Input
                    placeholder="Введите полное имя"
                    onChange={(e) => changeHandler("fullName", e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: "Введите email", type: "email" }]}
            >
                <Input
                    placeholder="Введите email"
                    onChange={(e) => changeHandler("email", e.target.value)}
                    disabled={isEdit}
                />
            </Form.Item>
            <Form.Item 
                label="Дата рождения"
                name="birthDate" 
                rules={[{ required: false}]}
            >
                <DatePicker
                    format="DD.MM.YYYY"
                    onChange={(date) => {
                        changeHandler("birthDate", date ? date.toDate() : dayjs())
                    }}
                />
            </Form.Item>
            <Form.Item
                label="телефон"
                name="telephone"
                rules={[
                    { 
                        required: false, 
                        message: 'Введите телефон' 
                    },
                    { 
                        pattern: /^\+7\d{10}$/, 
                        message: 'Введите телефон в формате +7XXXXXXXXXX' 
                    }
                ]}
            >
                <Input
                    addonBefore={<PhoneOutlined />}
                    placeholder="+7XXXXXXXXXX"
                    onChange={(e) => changeHandler("telephone", e.target.value)}
                />
            </Form.Item>
            <SelectForm
                label="должность"
                type="employment"
                onChange={(value) => {changeHandler("employment", value)}}
            />
            <Form.Item 
                name="userAgreement" 
                valuePropName="checked"
            >
                <Checkbox
                    onChange={(e) => changeHandler("userAgreement", e.target.checked)}
                >
                    Cогласен с пользовательским соглашением
                </Checkbox>
            </Form.Item>
            <Form.Item className={styles.buttons} name="submit">
                <Space>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                    <Button onClick={() => navigate("/")}>
                        Отмена
                    </Button>
                    {(action === "edit") &&
                        <>
                        <Modal
                            title="Удаление пользователя"
                            open={open}
                            onOk={submitDeleteHandler}
                            onCancel={hideModal}
                            okText="Да"
                            cancelText="Нет"
                        >
                            Вы действительно хотите удалить пользователя?
                        </Modal>
                        <Button color="danger" variant="solid" onClick={() => showModal()}>
                            Удалить пользователя
                        </Button>
                        </>
                    }
                </Space>
        </Form.Item>
        </Form>
    );
}

export default CreateEditForm;