import React, { useState } from 'react';
import { Input, Form, Button, Modal, Typography, DatePicker } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const AddWin = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button type="primary" size="large" onClick={() => setShowModal(true)}>
        Add Win
      </Button>
      <AddWinModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

const AddWinModal = (props: AddWinModalProps) => {
  const { showModal, setShowModal } = props;
  console.log('showModal');
  const addWinInitialValues = {};
  const handleCancel = () => setShowModal(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    // wrapperCol: {
    // xs: { span: 24 },
    // sm: { span: 16 },
    // },
  };
  return (
    <Modal
      title={<Title level={4}>Add Win</Title>}
      visible={showModal}
      onCancel={handleCancel}
      bodyStyle={{ padding: 40 }}
      width="40%"
    >
      <Form
        {...formItemLayout}
        layout="vertical"
        size="large"
        name="Add Win"
        initialValues={addWinInitialValues}
      >
        <Form.Item>
          <Form.Item>
            <DatePicker />
          </Form.Item>
          <TextArea
            placeholder="Describe the value of what you have achieved e.g I worked to optimize javascript size that reduced the page load time by 20%"
            autoSize={{ minRows: 3 }}
            style={{ resize: 'none' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

type AddWinModalProps = {
  showModal: boolean;
  setShowModal: Function;
};

export default AddWin;

