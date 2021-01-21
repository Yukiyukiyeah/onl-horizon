import {Input, InputNumber, Select, Tooltip} from "antd";
import classNames from 'classnames';
import ValidError from "./ValidError";
import React from "react";
const { Option } = Select;
const { TextArea } = Input;

const InputTypes = ['normal', 'numb', 'text', 'select'];
const InternalAdvInput = (props, ref) => {
  const {
    type = 'normal',
    wrapperClassName,
    className,
    children,
    // the width & height of "input"
    width,
    height,
    // ** use state as value
    value,
    // ** use setState as handleChange
    handleChange,

    title,
    // tooltip text
    tipText,
    tipClassName,
    // [min, max] ex:[10,100] = input range 10-100
    inputRange = null,
    // max input length = 100 chars
    maxLength = 100,
    // adaptive input
    isAdaptive = false,
    // same as input range, work only if isAdaptive = true
    widthRange = null,
    // for select
    size = "middle",
    // options of select, ex:[1, 2], can choose 1 , 2 from the select
    options,
    // the values of the select' options ex: options = [1, 2] optionsValue = [a, b]. choose 1, the value is a instead of 1
    optionsValue,
    // for error alert
    showError,
    errorText,
    placeholder,
    disabled = false
  } = props;

  const defaultInput = {
    backgroundColor: '#ffffff',
    borderRadius: '3px',
    border: 'solid 1px #707070',
    width: isAdaptive ? '100%' : (width || '200px'),
    height: height,
    minWidth : (isAdaptive && widthRange) ?  widthRange[0] : width,
    maxWidth : (isAdaptive && widthRange) ?  widthRange[1] : width,
  };
  const defaultTitle =   {
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '0',
    letterSpacing: '0',
    color: '#707070'
  };
  const classes = classNames(defaultInput, className);
  const kids = children || null;
  const inputRef = ref || React.createRef();

  const numbInp = (
    <InputNumber
      style={defaultInput}
      min={inputRange && inputRange[0]}
      max={inputRange && inputRange[1]}
      className={classes}
      value={value}
      onChange={ (value) => handleChange(value) }
      placeholder={inputRange ? `${inputRange[0]}-${inputRange[1]}` : 'null'}
      disabled={disabled}>
    </InputNumber>
  );
  const normalInp = (
    <Input
      style={defaultInput}
      className={classes}
      placeholder={placeholder}
      value={value}
      onChange={({ target: { value } }) => handleChange(value)}
      maxLength={maxLength}
      disabled={disabled}
    />
  );
  const selectInp = (
    <Select
      style={defaultInput}
      className={classes}
      value={value}
      size={size}
      disabled={disabled}
      onChange={(value) => handleChange(value)}>
      {options && options.map((option, index) => {
        return (
          <Option
            value={optionsValue[index]}
            key={index}>
            {option}
          </Option>);
      })}
    </Select>
  );
  const textArea = (
    <TextArea
      placeholder={placeholder}
      value={ value }
      style={defaultInput}
      autoSize = {{ minRows: 2, maxRows: 6 }}
      onChange={ ({ target: { value } }) => handleChange(value)}
      className={classes}
      maxLength={maxLength}
      disabled={disabled}/>
  );

  const myInput = ((type) => {
    switch (type) {
    case 'normal':
      return normalInp;
    case 'numb':
      return numbInp;
    case 'text':
      return textArea;
    case 'select':
      return selectInp;
    default:
      return normalInp;
    }
  })(type);

  const inputNode = (
    <div id="wrapper"
      className={wrapperClassName}
      ref={inputRef}>
      <p style={defaultTitle}>{title}</p>
      <Tooltip className={tipClassName}
        trigger={['focus']}
        title={tipText}
        placement="bottomLeft"
      >
        {myInput}
      </Tooltip>
      {showError && <ValidError errorText={errorText}/>}
      {kids}
    </div>

  );
  return inputNode;
};
const AdvInput = React.forwardRef(InternalAdvInput);
export default AdvInput;