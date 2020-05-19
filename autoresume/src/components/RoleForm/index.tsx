import React from 'react';
import { Form, DatePicker, Input, Button } from 'antd';

const { RangePicker } = DatePicker;

const RoleForm = (props: {
  handleFormSubmit: (values: any) => any;
  size: 'small' | 'middle' | 'large';
  showButton: boolean
}) => {
  const { handleFormSubmit, size, showButton } = props;

  return (
    <Form layout="vertical" size={size} onFinish={handleFormSubmit}>
      <Form.Item name="dates">
        <RangePicker />
      </Form.Item>
      <Form.Item
        name="companyName"
        rules={[
          {
            required: true,
            message:
              'Please enter the name of the Company/Organization e.g. Facebook, Open Source',
          },
        ]}
      >
        <Input placeholder="Enter Company Name" />
      </Form.Item>
      <Form.Item
        name="role"
        rules={[
          {
            required: true,
            message: 'Please enter the name of the role e.g. Software Engineer',
          },
        ]}
      >
        <Input placeholder="Enter Role. e.g Software Engineer" />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea
          placeholder="Add Role Description"
          autoSize={{ minRows: 3 }}
          style={{ resize: 'none' }}
        />
      </Form.Item>
      <Form.Item>
        {showButton && (
          <Button type="ghost" htmlType="submit">
            Add New Role
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default RoleForm;
