import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { NotificationState } from '../../types/charting/types';

type NotificationProps = {
  notificationState: NotificationState;
};

function Notification({ notificationState }: NotificationProps) {

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {

    setShow(notificationState?.isVisible ?? false);

  }, [notificationState]);

  interface CSSVars extends React.CSSProperties {
    ["--bs-bg-opacity"]?: string;
  }

  const toastStyle: CSSVars = {
    marginRight: notificationState.isOffCanvasVisible ? "365px" : "60px",
    "--bs-bg-opacity": "1"
  };

  return (
    <ToastContainer
      className="p-3"
      position="bottom-end"
      style={{ zIndex: 1 }}
    >
      <Toast
        style={{
          marginRight: notificationState.isOffCanvasVisible ? "365px" : "60px",
        }}
        onClose={() => setShow(false)}
        show={show}
        delay={4000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{notificationState.header ?? "Notification"}</strong>
        </Toast.Header>
        <Toast.Body>
          {notificationState.body ?? "Default notification body text"}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notification;
