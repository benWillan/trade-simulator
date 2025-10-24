//  internal.
import {Stock} from '../../types/charting/types';
//  external.
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
  isVisible: boolean;
  onTradeModalHide: () => void;
  graphData: Stock | null;
}

function TradeModal({
  isVisible,
  onTradeModalHide,
  graphData
}: Props) {

  const [checked, setChecked] = useState(false);

  const [orderTypeValue, setOrderTypeValue] = useState('1');
  const [actionTypeValue, setActionTypeValue] = useState('1');

  //const [graphData, setGraphData] = useState<Stock | null>(null);

  const actionType = [
    { name: 'Buy', value: '1'},
    { name: 'Sell', value: '2'},
  ];

  const orderType = [
    { name: 'Market', value: '1'},
    { name: 'Limit', value: '2'},
    { name: 'Stop', value: '3'},
  ];

  return (
    <Modal
      show={isVisible}
      onHide={onTradeModalHide}
      //size='lg'
      //dialogClassName="modal-wider-width"
      backdrop={false}
      // backdrop='static'                                              // keeps the dim overlay
      className="modal-click-through custom-modal-position"             // class added to the .modal element
      backdropClassName="backdrop-click-through"
    >
      <Modal.Header closeButton>
        <Modal.Title>Trade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 style={{textAlign:"center"}}>{graphData?.securityName}</h6>
        <h5 style={{textAlign:"center"}}>{graphData?.ticker}</h5>
        <Form>
          <Row>
            <div>
              <ButtonGroup>
              {actionType.map((radio, idx) => (
                <ToggleButton
                key={idx}
                id={`actionType-${idx}`}
                type="radio"
                variant={radio.value === '1' ? 'outline-success' : 'outline-danger'}
                name="actionType"
                value={radio.value}
                checked={actionTypeValue === radio.value}
                onChange={(e) => setActionTypeValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
              </ButtonGroup>
            </div>
          </Row>
          <Row>
            <h6>{graphData?.stockQuotes.at(-1)?.bidPrice.toFixed(3)} - {graphData?.stockQuotes.at(-1)?.askPrice.toFixed(3)}</h6>
          </Row>
          <Row>
            <ButtonGroup>
            {orderType.map((radio, idx) => (
              <ToggleButton
              key={idx}
              id={`orderType-${idx}`}
              type="radio"
              variant={'outline-secondary'}
              name="orderType"
              value={radio.value}
              checked={orderTypeValue === radio.value}
              onChange={(e) => setOrderTypeValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
            </ButtonGroup>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='$'></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type='number' placeholder='Units'></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {/* </div> */}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button className='ms-5' onClick={onTradeModalHide} variant="primary" size='sm'>Execute</Button>
        <Button className='me-5' onClick={onTradeModalHide} variant="danger" size='sm'>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )

}

export default TradeModal;