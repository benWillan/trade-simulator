//  internal.
import { Stock, StockOption } from '../../types/charting/types';
import AutocompleteInput from '../general/AutocompleteInput';
//  external.
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



type Props = {
  isVisible: boolean;
  stockLookupData: Stock[] | null;
  onStockLookupModalCloseClick: () => void;
  onStockSelect: (stock: StockOption | null) => void;
  onStockRemove: (ticker: string) => void;
}

function StockLookupModal({isVisible, onStockLookupModalCloseClick, onStockSelect, onStockRemove, stockLookupData}: Props) {

  return (
    <Modal
      show={isVisible}
      onHide={onStockLookupModalCloseClick}
      //size='lg'
      dialogClassName="modal-wider-width"
      backdrop={false}
      // backdrop='static'                                              // keeps the dim overlay
      className="modal-click-through custom-modal-position"             // class added to the .modal element
      backdropClassName="backdrop-click-through"
    >
      <Modal.Header closeButton>
        <Modal.Title>Stock Lookup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{width: "50%"}}>
          <AutocompleteInput onAutoCompleteSelect={onStockSelect}></AutocompleteInput>
        </div>
        {stockLookupData && stockLookupData.length > 0 &&
          <table style={{ borderCollapse: 'separate', borderSpacing: '20px' }}>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Security Name</th>
                <th>Earliest Quote</th>
                <th>Final Quote</th>
              </tr>
            </thead>
            <tbody>
              {stockLookupData?.map((item, index) => (
                <tr key={index}>
                  <td>{item.ticker}</td>
                  <td>{item.securityName}</td>
                  <td>{item.minDate}</td>
                  <td>{item.maxDate}</td>
                  <td><Button variant='danger' onClick={() => onStockRemove(item.ticker)} size='sm'>X</Button></td>
                </tr>))}
            </tbody>
          </table>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" size='sm' onClick={onStockLookupModalCloseClick}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StockLookupModal;