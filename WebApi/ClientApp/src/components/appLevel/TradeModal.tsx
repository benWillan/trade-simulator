//  internal.
import {Stock} from '../../types/charting/types';
import { side, orderType } from '../../types/appLevel/TradeModalTypes';
import { Order } from '../../types/appLevel/orderTypes';
import {NotificationType, NotificationStyle} from '../../types/charting/types';
import { StopLoss } from '../../types/appLevel/TradeModalTypes'
//  external.
import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { cwd } from 'process';

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

  const defaultStopLoss: StopLoss = {
    elementWithFocusId: null,
    ticks: null,
    percentage: null,
    price: null,
    usd: null
  }

  const [stopLossValues, setStopLossValues] = useState<StopLoss>(defaultStopLoss);

  const formRef = useRef<HTMLFormElement>(null);

  const handleTradeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    //const entries = Object.fromEntries(formData.entries());

    const payload = {
      userId: formData.get('userId'),
      stockId: formData.get('stockId'),
      orderType: Number(formData.get('orderType')),
      price: formData.get('price'),
      stopPrice: formData.get('stopPrice'),
      quantity: formData.get('quantity'),
      side: Number(formData.get('side'))
    };
    
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trade/execute`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

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

  const handleStopLossOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {

    const inputWithFocusId = e.currentTarget.id;

    setStopLossValues(prev => ({...prev, elementWithFocusId: inputWithFocusId}));

  }

  const handleStopLossPriceOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {

    const inputWithFocusId = e.currentTarget.id;

    setStopLossValues(prev => ({...prev, elementWithFocusId: inputWithFocusId}));

  }

  const handleStopLossPercentageOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {

    const inputWithFocusId = e.currentTarget.id;

    setStopLossValues(prev => ({...prev, elementWithFocusId: inputWithFocusId}));

  }

  const handleStopLossInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // console.log(e.target.id);
    
    // let x = graphData?.stockQuotes.at(-1)?.askPrice;
    
    // const newVal: StopLoss =  {
    //   ticks: parseInt(e.target.value) * 2,
    //   price: graphData?.stockQuotes.at(-1)?.askPrice ?? null,
    //   usd: 12,
    //   percentage: parseInt(e.target.value)
    // }

    const valueInputIntoStopLossInputs = e.target.value;
    const stopLossInputId = e.target.value;

    switch(stopLossInputId) {

      case "stopLossPercentage1":

        setStopLossValues(prev => ({...prev, percentage: Number(valueInputIntoStopLossInputs)}));
        break;

      case "stopLossUsd1":

        setStopLossValues(prev => ({...prev, usd: Number(valueInputIntoStopLossInputs)}));
        break;

      case "":


    }


  }

  useEffect(() => {

    // if (!stopLossValues.elementWithFocusId) return;

    // switch(stopLossValues.elementWithFocusId) {

    //   case "stopLossPercentage1":
    //     setStopLossValues(prev => ({...prev, price: ((graphData?.stockQuotes?.at(-1)?.askPrice ?? 0) * 0.1)}));
    //     break;

    //   case "stopLossPrice1":
    //     setStopLossValues(prev => ({...prev, percentage: ((graphData?.stockQuotes?.at(-1)?.askPrice ?? 0) * 0.50)}));
    //     break;

    //   case "":
    //     break;

    // }

    // const updatedValues: StopLoss =  {
    //   ticks: 0,
    //   price: ,
    //   usd: 0,
    //   percentage: parseInt(e.target.value)
    // }
    
    // setStopLossValues(prev => ({...prev, price: (graphData?.stockQuotes.at(-1)?.askPrice ?? 0) * 0.1, ticks: 0, usd: 0}));

  }, [graphData]);

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
        <Modal.Title>Trade Order</Modal.Title>
      </Modal.Header>

      <Form ref={formRef} onSubmit={handleTradeSubmit}>
        <Modal.Body>
          <Form.Control type='hidden' name='userId' value={userId}></Form.Control>
          <Form.Control type='hidden' name='stockId' value={graphData?.id}></Form.Control>
          <Form.Control type='hidden' name='createdAt' value={currentHistoricalDateTime ?? "date error"}></Form.Control>
          <Form.Control type='hidden' name='stockId' value={graphData?.id}></Form.Control>
          <h6 style={{textAlign:"center"}}>{graphData?.securityName} [{graphData?.ticker}]</h6>
          <hr />
          {/* <h5 style={{textAlign:"center"}}>{graphData?.ticker}</h5> */}
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
              <h6>${graphData?.stockQuotes.at(-1)?.bidPrice.toFixed(3)} (Bid) - ${graphData?.stockQuotes.at(-1)?.askPrice.toFixed(3)} (Ask)</h6>
              <h6>Available volume: {graphData?.stockQuotes.at(-1)?.availableVolume.toLocaleString()}</h6>
              <h6>Available short: {graphData?.stockQuotes.at(-1)?.availableShort.toLocaleString()}</h6>
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
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control type='number' name='price' readOnly={orderTypeValue === 1} value={orderTypeValue === 1 ? graphData?.stockQuotes.at(-1)?.askPrice.toFixed(2) : ""} min={0.01} step={0.01} placeholder=''></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type='number' name='quantity' step={0.001} placeholder='Units'></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className='col-6'>
                <Form.Group>
                  <Form.Label>Stop Price ($)</Form.Label>
                  <Form.Control type='number' disabled={orderTypeValue !== 4} name='stopPrice' min={0.01} step={0.01} placeholder=''></Form.Control>
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
            {/* input pairs */}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Ticks</Form.Label>
                  <Form.Control type='number' id='stopLossTicks1' onFocus={handleStopLossOnFocus} value={stopLossValues?.ticks ?? ""} disabled={stopLossIsDisabled} name='ticksStopLoss' step={0.01} placeholder=''></Form.Control>
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
                  <Form.Control id='stopLossPrice1' type='number' onFocus={handleStopLossPriceOnFocus} onChange={handleStopLossInputChange} value={stopLossValues.price ?? ""} disabled={stopLossIsDisabled} name='priceStopLoss' step={0.01} placeholder=''></Form.Control>
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
                  <Form.Control id='stopLossUsd1' onFocus={handleStopLossOnFocus} type='number' value={stopLossValues?.usd ?? ""} disabled={stopLossIsDisabled} name='currencyStopLoss' step={0.01} ></Form.Control>
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
                  <Form.Control type='number' id='stopLossPercentage1' onFocus={handleStopLossPercentageOnFocus} onChange={handleStopLossInputChange} value={stopLossValues?.percentage ?? ""} disabled={stopLossIsDisabled} name='percentageStopLoss' step={0.01} placeholder=''></Form.Control>
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