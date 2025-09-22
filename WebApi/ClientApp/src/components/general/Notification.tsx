import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useEffect } from 'react';

type Props = {
  isVisible: boolean;
  isOffCanvasVisible: boolean;
}

function Notification({isVisible, isOffCanvasVisible}: Props) {

  const [show, setShow] = useState(false);

  useEffect(() => {

    if (isVisible === true) {
      
      setShow(true);

    } else {

      setShow(false);

    }

  }, [isVisible]);

  return (
    <ToastContainer
          className="p-3"
          position={"bottom-end"}
          style={{ zIndex: 1 }}
        >
      <Toast style={ isOffCanvasVisible ? { marginRight: "365px"} : { marginRight: "60px"}} onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          {/* <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
            /> */}
          <strong className="me-auto">Bootstrap</strong>
          <small></small>
        </Toast.Header>
        <Toast.Body>You're reading this text in a Toast! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, facere similique. Soluta perferendis sit a pariatur error repellendus voluptates natus dignissimos. Laborum iure sequi architecto voluptates dolores eaque aperiam in!</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notification;