import React from 'react';
import { Modal, Form, Input, Select, Radio } from 'antd';

const { Option } = Select;

const CustomModal = ({ visible, onCreate, onCancel, title, fields }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onCreate(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'input':
        return <Input {...field.props} />;
      case 'email':
        return <Input type="email" {...field.props} />;
      case 'select':
        return (
          <Select {...field.props}>
            {field.options.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case 'radio':
        return (
          <Radio.Group {...field.props}>
            {field.options.map(option => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        {fields.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules}
          >
            {renderField(field)}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default CustomModal;
