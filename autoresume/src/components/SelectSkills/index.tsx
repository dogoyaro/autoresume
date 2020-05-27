import React, { useState } from 'react';
import { Select, Row, Col, Tag, Input, Rate, Button, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const SelectSkills = (props: {
  size?: 'middle' | 'large' | 'small';
  placeholder?: string;
  skillList: string[];
}) => {
  const { skillList, placeholder, size } = props;
  const initialSkills: { [key: string]: any } = {};
  const [skills, setSkills] = useState(initialSkills);
  const [presentSkill, setPresentSkill] = useState('');
  const [presentRate, setPresentRate] = useState(0);
  const [options, setOptions] = useState(skillList);

  const handleSkillSelectChange = (value: string) => {
    setPresentSkill(value);
    if (skills[value]) {
      setPresentRate(skills[value]);
    }
  };

  const handleRateSkillChange = (value: number) => {
    setPresentRate(value);
  };

  const handleAddSkillClick = () => {
    setPresentSkill('');
    setPresentRate(0);
    setSkills({ ...skills, [presentSkill]: presentRate });
  };

  const handleCloseTag = (key: string) => {
    const initialValue: { [key: string]: any } = {};
    const newSkills: { [key: string]: any } = Object.keys(skills).reduce(
      (reduced: { [key: string]: any }, skill: string) => {
        let result = reduced;
        if (skill !== key) {
          result = { ...reduced, [skill]: skills[skill] };
        }
        return result;
      },
      initialValue,
    );
    setSkills(newSkills);
  };

  const handleSearch = (value: string) => {
    const skillListSet = new Set([...skillList, value]);
    setOptions([...skillListSet]);
  };

  return (
    <div>
      <div>
        <Row gutter={[10, 5]}>
          {Object.entries(skills).map(([key, value]) => {
            return (
              <Col span={value + 6}>
                <Tag
                  visible
                  closable
                  color="cyan"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                  onClose={() => handleCloseTag(key)}
                >
                  {key}
                </Tag>
              </Col>
            );
          })}
        </Row>
      </div>
      <Input.Group style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          showSearch
          placeholder={placeholder || 'Add Skill'}
          size={size || "middle"}
          value={presentSkill ? presentSkill : undefined}
          onChange={handleSkillSelectChange}
          onSearch={handleSearch}
          style={{ marginRight: 10, display: 'flex', minWidth: '25%', textAlign: 'left' }}
        >
          {options.map((skill) => (
            <Option key={skill} value={skill}>
              {skill}
            </Option>
          ))}
        </Select>
        <Rate
          value={presentRate}
          onChange={handleRateSkillChange}
          style={{ marginRight: 10 }}
          allowClear
          allowHalf
        />
        <Tooltip title="Rank the Importance of this Skill to this Win">
          <Button
            type="link"
            icon={<PlusCircleOutlined />}
            onClick={handleAddSkillClick}
            disabled={!(presentRate && presentSkill)}
          />
        </Tooltip>
      </Input.Group>
    </div>
  );
};

export default SelectSkills;
