//  external.
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Props = {
  isVisible: boolean;
  onTradeModalHide: () => void;
}

function TradeModal({
  isVisible,
  onTradeModalHide
}: Props) {

  return (
    <Modal
      show={isVisible}
      onHide={onTradeModalHide}
      //size='lg'
      dialogClassName="modal-wider-width"
      backdrop={false}
      // backdrop='static'                                              // keeps the dim overlay
      className="modal-click-through custom-modal-position"             // class added to the .modal element
      backdropClassName="backdrop-click-through"
    >
      <Modal.Header closeButton>
        <Modal.Title>Trade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onTradeModalHide} variant="primary" size='sm'>Execute</Button>
      </Modal.Footer>
    </Modal>
  )

}

export default TradeModal;