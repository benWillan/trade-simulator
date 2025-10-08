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
  comparisonGraphData: Stock[] | null;
  onComparisonModalCloseClick: () => void;
  onComparisonStockSelect: (stock: StockOption | null) => void;
  onComparisonStockRemove: (ticker: string) => void;
}

function CompareModal({isVisible, comparisonGraphData, onComparisonStockSelect, onComparisonModalCloseClick, onComparisonStockRemove}: Props) {
  
  return (
    <Modal
      show={isVisible}
      onHide={onComparisonModalCloseClick}
      size='lg'
      backdrop={false}
      // backdrop='static'                        // keeps the dim overlay
      className="modal-click-through custom-modal-position"             // class added to the .modal element
      backdropClassName="backdrop-click-through"
    >
      <Modal.Header closeButton>
        <Modal.Title>Compare</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutocompleteInput onAutoCompleteSelect={onComparisonStockSelect}></AutocompleteInput>
        {comparisonGraphData &&
          <table style={{ borderCollapse: 'separate', borderSpacing: '20px' }}>
            <tbody>
              {comparisonGraphData?.map((item, index) => (
                <tr key={index}>
                  <td>{item.ticker}</td>
                  <td>{item.securityName}</td>
                  <td><Button variant='danger' onClick={() => onComparisonStockRemove(item.ticker)} size='sm'>X</Button></td>
                </tr>))}
            </tbody>
          </table>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" size='sm' onClick={onComparisonModalCloseClick}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompareModal;