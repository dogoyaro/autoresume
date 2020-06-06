import React, { useState } from 'react';
import { Steps } from 'antd';
import FilterForm from '../FilterForm';
import Preview from '../Preview'
import ResumeDocument from '../Preview/components/ResumeDocument';

const { Step } = Steps;

const displays: { [key: number]: any } = {
  0: FilterForm,
  1: Preview,
  2: ResumeDocument,
};

const Download = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const CurrentView = displays[currentStep];
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        padding: '10px 0',
        flexDirection: 'column',
      }}
    >
      <div style={{ margin: '10px 0 30px 0' }}>
        <DownloadSteps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <CurrentView
          moveToView={(value: number) => setCurrentStep(value + currentStep)}
        />
      </div>
    </div>
  );
};

const DownloadSteps = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => any;
}) => {
  return (
    <Steps
      progressDot
      size="small"
      current={currentStep}
      onChange={setCurrentStep}
      style={{ display: 'flex', flex: 1, textAlign: 'left' }}
    >
      <Step title="Filter" />
      <Step title="Preview" disabled={currentStep < 1} />
      <Step title="Print" />
    </Steps>
  );
};

export default Download;
