import React, { useState } from 'react';
import RoleForm from '../RoleForm';
import { Modal, Typography, Button } from 'antd';

const { Title } = Typography;

const AddRoleModal = (props: AddRoleModalProps) => {
  const { showModal, setShowModal } = props;
  const handleCancel = () => setShowModal(false);

  return (
    <Modal
      title={<Title level={4}> Add Role </Title>}
      visible={showModal}
      onCancel={handleCancel}
      bodyStyle={{ padding: 40 }}
      width="40%"
    >
      <RoleForm handleFormSubmit={() => {}} showButton={false} size="large" />
    </Modal>
  );
};

const AddRole = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button type="primary" size="large" onClick={() => setShowModal(true)}>
        Add Role
      </Button>
      <AddRoleModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default AddRole;

type AddRoleModalProps = {
    showModal: boolean,
    setShowModal: (shouldShowModal: boolean) => any,
}
