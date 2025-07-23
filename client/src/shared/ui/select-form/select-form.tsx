import { Form, Select } from "antd";
import { Employment } from "@/entities/user/model/user-model";

const { Option } = Select;

interface SelectFormProps {
  label: string;
  type: "employment";
  value?: string;
  onChange: (value: string) => void;
}
const SelectForm = ({ label, type, value, onChange }: SelectFormProps) => {
  const getOptions = () => {
    switch (type) {
      case "employment":
        return Object.values(Employment);
      default:
        return [];
    }
  };

  return (
    <Form.Item label={label} name={type}>
      <Select value={value} onChange={onChange}>
        {getOptions().map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectForm;
