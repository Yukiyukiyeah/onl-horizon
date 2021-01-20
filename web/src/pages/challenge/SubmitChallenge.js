import React, { useState, useEffect } from 'react';
import {Button, Upload, message, Col, Row} from "antd";
import AdvInput from "../../components/AdvInput";
import { nanoid } from 'nanoid';
import '../../styles/SubmitChallenge.scss';

const SubmitChallenge = (props) => {
  const { title: initTitle, model: initModel, handleNext } = props;
  const [title, setTitle] = useState(initTitle ? initTitle : '');
  const [modelFileName, setModelFileName] = useState(initModel ? initModel: '');
  const [isModel, setIsModel] = useState(false);
  const [modelFile, setModelFile] = useState('');

  const onClickNext = () => {
    const formData = new FormData();
    formData.append('challengeId', nanoid());
    formData.append('name', title);
    formData.append('model', modelFile);
    handleNext(formData);
    // const param = {};
    // params['challengeId'] = nanoid();
    // params['name'] = title;
    // params['model'] = modelFile;
    // handleNext(params);
  };

  // todo: upload the binary model
  const uploadParams = {
    name: 'file',
    beforeUpload: (file) => {
      return false;
    },
    onChange(info) {
      console.log(info.fileList);
      setModelFileName(info.file.name);
      if (info.fileList.length > 0) {
        setIsModel(true);
      } else {
        setIsModel(false);
      }
      console.log(info.fileList[0]);
      console.log(info.file);
      setModelFile(info.fileList);
    },
  };

  return(
    <div className="submit-challenge-container">
      <Row className="content-zone" justify="center">
        <Col span={20}>
          <p className="title">Challenge</p>
          <div className="model-name">
            <AdvInput
              type="normal"
              title="Name"
              placeholder={title}
              handleChange={setTitle}
              widthRange={[200, 1200]}
              isAdaptive={true}
              height="40px"
            />
          </div>

          <Row className="model">
            <AdvInput
              type="normal"
              title="Model Upload"
              placeholder={modelFileName}
              value={modelFileName}
              widthRange={[200, 400]}
              isAdaptive={false}
              height="40px"
              disabled={true}
            />
            <div className="upload">
              <Upload {...uploadParams} >
                <Button disabled={isModel}>Browse</Button>
              </Upload>
            </div>
          </Row>
        </Col>
      </Row>
      <Row justify="end">
        <Col span={4}>
          <Button type="primary" onClick={onClickNext}>NEXT</Button>
        </Col>
      </Row>
    </div>
  );
};


export default SubmitChallenge;