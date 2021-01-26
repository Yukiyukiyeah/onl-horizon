import React, { useState, useEffect, useMemo } from 'react';
import {Button, Upload, message, Col, Row} from "antd";
import AdvInput from "../../components/AdvInput";
import { nanoid } from 'nanoid';
import '../../styles/SubmitChallenge.scss';

const SubmitChallenge = (props) => {
  const { title: initTitle, model: initModel, handleNext } = props;
  const [title, setTitle] = useState(initTitle ? initTitle : '');
  const [modelFileName, setModelFileName] = useState(initModel ? initModel: 'Model Path');
  const [isModel, setIsModel] = useState(false);
  const [modelFile, setModelFile] = useState(null);
  const [checkValid, setCheckValid] = useState(false);

  const onClickNext = () => {
    if (titleValid && modelValid) {
      const params = {};
      params['modelId'] = nanoid();
      params['name'] = title;
      const filereader = new FileReader();
      filereader.readAsDataURL(modelFile);
      filereader.onload = e => {
        const model = filereader.result.split(',')[1];
        params['model'] = model;
        handleNext(params);
      };
    } else {
      setCheckValid(true);
    }
  };

  const uploadParams = {
    name: 'file',
    beforeUpload: (file) => {
      setModelFile(file);
      setModelFileName(file.name);
      return false;
    },
    onChange(info) {
      if (info.fileList.length > 0) {
        setIsModel(true);
      } else {
        setIsModel(false);
      }
    },

  };

  const titleValid = useMemo(() => {
    return title;
  }, [title]);

  const modelValid = useMemo(() => {
    return isModel;
  }, [isModel]);

  return(
    <div className="submit-challenge-container">
      <Row className="content-zone" justify="center">
        <Col span={20}>
          <p className="title">Challenge</p>
          <div className="model-name">
            <AdvInput
              type="normal"
              title="Name"
              placeholder="Model Name"
              handleChange={setTitle}
              widthRange={[200, 1200]}
              showError={checkValid && !titleValid}
              errorText="Please enter your name"
              isAdaptive={true}
              height="40px"
            />
          </div>

          <Row className="model">
            <AdvInput
              type="normal"
              title="Model Upload"
              placeholder={modelFileName}
              widthRange={[200, 400]}
              showError={checkValid && !modelValid}
              errorText="Please upload your model"
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