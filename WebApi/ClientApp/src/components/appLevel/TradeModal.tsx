//  internal.
import {Stock} from '../../types/charting/types';
import { side, orderType } from '../../types/appLevel/TradeModalTypes';
import { Order } from '../../types/appLevel/orderTypes';
import {NotificationType, NotificationStyle} from '../../types/charting/types';
//  external.
import React, { useEffect, useState, useRef } from 'react'
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
  userId: number;
  currentHistoricalDateTime: string | null;
  showNotification: (header: NotificationType, body: string, style?: NotificationStyle) => void;
  onTradeOrderPost: (order: Order) => void;
}

function TradeModal({isVisible, onTradeModalHide, graphData, userId, currentHistoricalDateTime, showNotification, onTradeOrderPost}: Props) {

  const [orderTypeValue, setOrderTypeValue] = useState(1);
  const [sideValue, setSideValue] = useState(1);

  const [stopLossIsDisabled, setStopLossIsDisabled] = useState<boolean>(true);
  const [takeProfitIsDisabled, setTakeProfitIsDisabled] = useState<boolean>(true);

  const formRef = useRef<HTMLFormElement>(null);

  const handleTradeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());

    const payload = {
      userId: formData.get('userId'),
      stockId: formData.get('stockId'),
      orderType: Number(formData.get('orderType')),
      price: formData.get('price'),
      quantity: formData.get('quantity'),
      side: Number(formData.get('side'))
    };
    
    const response = await fetch("https://localhost:7133/api/broker/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json() as Order;

    if (response.status === 200 && data) {

      onTradeOrderPost(data);
      showNotification('Trade Placed', `At price: ${data.price}`, 'success');
      onTradeModalHide();
      return;

    }

    showNotification('Error', `An error occured while placing trade`, 'danger');
    onTradeModalHide();

  }

  const handleExecuteClick = () => {
    //  trigger form submit programmatically.
    formRef.current?.requestSubmit();
  };

  const handleStopLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setStopLossIsDisabled(!e.target.checked);

  }

  const handleTakeProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setTakeProfitIsDisabled(!e.target.checked);

  }

  const sideStateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setSideValue(Number(e.currentTarget.value));

  }

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

      <Form ref={formRef} onSubmit={handleTradeSubmit}>
        <Modal.Body>
          <Form.Control type='hidden' name='userId' value={userId}></Form.Control>
          <Form.Control type='hidden' name='stockId' value={graphData?.id}></Form.Control>
          <Form.Control type='hidden' name='createdAt' value={currentHistoricalDateTime ?? "date error"}></Form.Control>
          <Form.Control type='hidden' name='stockId' value={graphData?.id}></Form.Control>
          <h6 style={{textAlign:"center"}}>{graphData?.securityName}</h6>
          <h5 style={{textAlign:"center"}}>{graphData?.ticker}</h5>
            <Row>
              <div>
                <ButtonGroup>
                {side.map((radio, idx) => (
                  <ToggleButton
                    key={`actionType-key-${idx}`}
                    id={`actionType-${idx}`}
                    type="radio"
                    variant={radio.value === 1 ? 'outline-success' : 'outline-danger'}
                    name="side"
                    value={radio.value}
                    checked={sideValue === radio.value}
                    onChange={sideStateOnChange}
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
                  key={`orderType-key-${idx}`}
                  id={`orderType-${idx}`}
                  type="radio"
                  variant={'outline-secondary'}
                  name="orderType"
                  value={radio.value}
                  checked={orderTypeValue === radio.value}
                  onChange={(e) => setOrderTypeValue(Number(e.currentTarget.value))}
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
                  <Form.Control type='number' name='price' min={0.01} step={0.01} placeholder='$'></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type='number' name='quantity' step={0.001} placeholder='Units'></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {/* <div style={{marginTop: "12px"}}>
              <hr></hr>
            </div> */}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Stop Loss</Form.Label>
                  <Form.Check type='checkbox' onChange={handleStopLossChange}></Form.Check>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Take Profit</Form.Label>
                  <Form.Check type='checkbox' onChange={handleTakeProfitChange}></Form.Check>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Ticks</Form.Label>
                  <Form.Control type='number' disabled={stopLossIsDisabled} name='ticksStopLoss' step={0.01} placeholder=''></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Ticks</Form.Label>
                  <Form.Control type='number' disabled={takeProfitIsDisabled} name='ticksTakeProfit' step={0.01} placeholder=''></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type='number' disabled={stopLossIsDisabled} name='priceStopLoss' step={0.01} placeholder=''></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type='number' disabled={takeProfitIsDisabled} name='priceTakeProfit' step={0.01} placeholder=''></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>USD</Form.Label>
                  <Form.Control type='number' disabled={stopLossIsDisabled} name='currencyStopLoss' step={0.01} placeholder=''></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>USD</Form.Label>
                  <Form.Control type='number' disabled={takeProfitIsDisabled} name='currencyTakeProfit' step={0.01} placeholder=''></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>%</Form.Label>
                  <Form.Control type='number' disabled={stopLossIsDisabled} name='percentageStopLoss' step={0.01} placeholder=''></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>%</Form.Label>
                  <Form.Control type='number' disabled={takeProfitIsDisabled} name='percentageTakeProfit' step={0.01} placeholder=''></Form.Control>
                </Form.Group>
              </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button className='ms-5' style={{width:"58px"}} type='button' onClick={handleExecuteClick} variant={sideValue === 1 ? 'success' : 'danger'} size='sm'>{sideValue === 1 ? "Buy" : "Sell"}</Button>
          <Button className='me-5' style={{width:"58px"}} type='button' onClick={onTradeModalHide} variant="secondary" size='sm'>Cancel</Button>
        </Modal.Footer>

      </Form>
    </Modal>
  )

}

export default TradeModal;