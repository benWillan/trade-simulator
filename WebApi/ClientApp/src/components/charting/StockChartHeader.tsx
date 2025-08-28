import { Stock } from '../../types/charting/types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'

type Props = {
  stockData: Stock | null;
};

function StockChartHeader({ stockData }: Props) {
  if (!stockData) return null;

  const excludedKeys: (keyof Stock)[] = ['id', 'stockQuotes', 'securityName'];

  const keys = (Object.keys(stockData) as (keyof Stock)[]).filter(
    (key) => !excludedKeys.includes(key)
  );

  const formatCamelCase = (str: string): string => {

    if (!str) return '';

    //  to insert a space before each uppercase letter (except the first one).
    const withSpaces = str.replace(/([A-Z])/g, ' $1');

    //  to capitalize the first character.
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
    
  }

  return (
    <Container fluid className='pt-2 ps-1'>
      <Row>
        <Col>
          <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  {keys.map((key) => (
                    <th
                      key={key}
                      style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'left', fontSize: 11 }}
                    >
                      {formatCamelCase(key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {keys.map((key) => {
                    const value = stockData[key];
                    return (
                      <td
                        key={key}
                        style={{ border: '1px solid #ccc', padding: '4px', fontSize: 11 }}
                      >
                        {value === null || value === undefined
                          ? '-'
                          : Array.isArray(value)
                          ? JSON.stringify(value) //  render arrays as strings.
                          : String(value)}
                      </td>
                    );
                  })}
                </tr>
              </tbody>

          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default StockChartHeader;
