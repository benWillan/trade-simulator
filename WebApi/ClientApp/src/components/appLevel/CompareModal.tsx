// import Modal from 'react-bootstrap/Modal';

function CompareModal() {

//   return (
//     <Modal
//     show={isModalVisible}
//     onHide={closeCompareModal}
//     size='lg'
//     backdrop={false}
//     // backdrop='static' // keeps the dim overlay
//     className="modal-click-through"        // class added to the .modal element
//     backdropClassName="backdrop-click-through"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Compare</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <AutocompleteInput onAutoCompleteSelect={handleComparisonSelect}></AutocompleteInput>
//         {comparisonGraphData &&
//           <table style={{ borderCollapse: 'separate', borderSpacing: '20px' }}>
//             <thead>
//               <tr>
//                 <th>Ticker</th>
//                 <th>Security</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {comparisonGraphData?.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.ticker}</td>
//                   <td>{item.securityName}</td>
//                   <td><Button variant='danger' size='sm'>X</Button></td>
//                 </tr>))}
//             </tbody>
//           </table>
//         }
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="primary" size='sm' onClick={addComparisonDataToGraph}>Save</Button>
//         <Button variant="secondary" size='sm' onClick={closeCompareModal}>Cancel</Button>
//       </Modal.Footer>
//     </Modal>
//   );
}

export default CompareModal;