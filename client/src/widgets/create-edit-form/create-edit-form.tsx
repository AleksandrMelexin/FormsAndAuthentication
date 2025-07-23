import { v4 as uuidv4 } from "uuid";
import { Employment, type IUser } from "@/entities/user/model/user-model";
import styles from "./create-edit-form.module.css";
import { Form, Input, Button, DatePicker, Checkbox, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectForm from "@/shared/ui/select-form";
import { PhoneOutlined } from "@ant-design/icons";
import moment from 'moment';

const emptyUser: IUser = {
    id: "",
    name: "",
    surName: "",
    password: "",
    fullName: "",
    email: "",
    birthDate: moment(),
    telephone: "",
    employment: Employment.none,
    userAgreement: false
}

interface CreateEditFormProps {
    gotUser?: IUser;
    action: "edit" | "create";
}

const CreateEditForm = ({gotUser = emptyUser, action}: CreateEditFormProps) => {
    const [isEdit, setIsEdit] = useState(action === "edit");
    const [user, setUser] = useState<IUser>({
        ...gotUser,
        id: gotUser.id || uuidv4(),
        birthDate: gotUser.birthDate ? moment(gotUser.birthDate) : moment()
    })
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const changeHandler = (name: string, value: string | boolean | Date | moment.Moment) => {
        setUser((prev) => ({ ...prev, [name]: value }));
      };

    const submitEditHandler = () => {
        console.log("edit");
    };
    
    const submitCreateHandler = () => {
        console.log("create");
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
        navigate("/");
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
                label="Имя"
                name="surName"
                rules={[{ required: true, message: "Введите фамилию" }]}
            >
                <Input
                    placeholder="Введите фамилию"
                    onChange={(e) => changeHandler("surName", e.target.value)}
                />
            </Form.Item>
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
                rules={[{ required: true, message: "Введите email" }]}
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
                        changeHandler("birthDate", date ? date.toDate() : moment())
                    }}
                />
            </Form.Item>
            <Form.Item
                label="телефон"
                name="telephone"
                rules={[{ required: false}]}
            >
                <Input
                    addonBefore={<PhoneOutlined />}
                    placeholder="+7 (___) ___-__-__"
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
            <Form.Item className={styles.buttons}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                    <Button onClick={() => navigate("/")}>
                        Отмена
                    </Button>
                </Space>
        </Form.Item>
        </Form>
    );
}

export default CreateEditForm;