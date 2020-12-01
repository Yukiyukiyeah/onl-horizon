import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import '../styles/Modal.scss'
const Modal = (props) => {
  let button;
  if (props.btnType === 1) {
    button =    <a href="javascript:" className="btn" onClick={props.handleConfirm}>{props.confirmText} </a>
  }
  else if (props.btnType === 2) {
    button = <a href="javascript:" className="btn" onClick={props.handleCancel}>{props.cancelText}</a>
  }
  else {
    button = (
      <div className="btn-group">
        <a href="javascript:" className="btn confirm-btn" onClick={props.handleConfirm}>{props.confirmText}</a>
        <a href="javascript:" className="btn" onClick={props.handleCancel}>{props.cancelText} </a>
      </div>);

  }
  return (
    <ReactCSSTransitionGroup
      transitionName="slide"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
      {props.showModal &&
            <div className="modal" >
              <div className="mask">
              </div>
              <div className="modal-dialog">
                <div className="modal-header">
                  <span>{props.title}</span>
                </div>
                <div className="modal-body">
                  <span>{props.description}</span>
                </div>
                <div className="modal-footer">
                  {button}
                </div>
              </div>
            </div>}
    </ReactCSSTransitionGroup>
  )
}

export default Modal;