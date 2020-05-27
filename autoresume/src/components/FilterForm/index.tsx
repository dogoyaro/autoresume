import React, { useState } from 'react';
import { Button, InputNumber, DatePicker, Input, Form, Select } from 'antd';
import SelectSkills from '../SelectSkills';

const { RangePicker } = DatePicker;

const { Option } = Select;

const FilterForm = ({ moveToView }: { moveToView: (view: number) => any }) => {
  const [filterConfiguration, selectFilterConfiguration] = useState();
  const moveToNext = () => moveToView(1);

  return (
    <div
      style={{ padding: 20, display: 'flex', flex: 1, flexDirection: 'column' }}
    >
      <div style={{ display: 'flex' }}>
        <SelectFilterConfiguration
          filterConfiguration={filterConfiguration}
          selectConfiguration={selectFilterConfiguration}
        />
      </div>
      <div style={{ margin: '40px 0' }}>
        <FormFields moveToNext={moveToNext} />
      </div>
    </div>
  );
};

const FormFields = ({ moveToNext }: { moveToNext: () => void }) => {
  const handleFormSubmit = () => {
    moveToNext();
  };
  return (
    <Form
      layout="vertical"
      size="large"
      style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
    >
      <Form.Item style={{ display: 'flex', width: '50%' }}>
        <Input placeholder="Enter Full Name" />
      </Form.Item>
      <Form.Item style={{ display: 'flex', width: '70%' }}>
        <Input.TextArea
          placeholder="Enter Address"
          style={{ resize: 'none' }}
        />
      </Form.Item>
      <Form.Item>
        <SelectSkills
          placeholder="Filter by Skills"
          size="large"
          skillList={['python', 'javascript', 'system design']}
        />
      </Form.Item>
      <Form.Item style={{ display: 'flex', flex: 1, alignSelf: 'start' }}>
        <RangePicker />
      </Form.Item>
      <Form.Item style={{ display: 'flex', flex: 1, alignSelf: 'start' }}>
        <InputNumber
          min={1}
          max={15}
          placeholder="Maximum Number of Pages"
          style={{ width: 240 }}
        />
      </Form.Item>
      <Form.Item style={{ alignSelf: 'flex-end' }}>
        <Button type="primary" onClick={handleFormSubmit}>
          Preview Summary
        </Button>
      </Form.Item>
    </Form>
  );
};

const dummyFilterConfigurations = [
  {
    id: 1,
    name: 'Fullstack Role',
  },
  {
    id: 2,
    name: 'Frontend Role',
  },
  {
    id: 3,
    name: 'Python Developer',
  },
  {
    id: 4,
    name: 'Senior Engineer',
  },
];

const SelectFilterConfiguration = ({
  selectConfiguration,
  filterConfiguration,
}: {
  selectConfiguration: (config: number) => any;
  filterConfiguration: number;
}) => {
  return (
    <Select
      showSearch
      placeholder="Select Filter Configuration"
      onChange={selectConfiguration}
      value={filterConfiguration}
    >
      {dummyFilterConfigurations.map((config: { name: string; id: number }) => (
        <Option key={config.id} value={config.id}>
          {config.name}
        </Option>
      ))}
    </Select>
  );
};

export default FilterForm;
