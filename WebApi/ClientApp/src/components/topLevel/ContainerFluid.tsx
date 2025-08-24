import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppButton } from '../general/AppButton'
import { useState } from 'react'
import StockChartHeader from '../charting/StockChartHeader';
import { Stock, StockQuote2 } from '../../types/AutocompleteInput'
import Button from 'react-bootstrap/Button';

type StockQuote = {
  stockSymbol: string;
  date: string
  openPrice: number;
  closePrice: number;
};

export function ContainerFluid() {

  const [data, setData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [data2, setData2] = useState<StockQuote2[]>([]);

  const fetchData = async (securityName: string) => {

    setLoading(true);

    try {

      const res = await fetch(`https://localhost:7133/api/search?securityName=${securityName}`);
      const json: Stock[] = await res.json();
      setData(json);

    } catch (error) {

      console.error("Fetch error:", error);

    } finally {

      setLoading(false);
      console.log(data);

    }

  };

  const clearData = () => {

    setData([]);

  }

  return (
    <Container fluid>
      <Row>
        <Col className='py-3'>
          <StockChartHeader onSearch={fetchData}></StockChartHeader>
        </Col>
        <Col className='py-3'>
          {/* <AppButton variant='danger' size='sm' onClick={clearData}>Clear</AppButton> */}
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          {data.length > 0 ? (
            <ul>
              {[...data].map((item, index, arr) => (
                <li key={index}>
                  {/* {arr.length - 1 - index}:{item.date}, {item.stockSymbol}, {item.openPrice} {item.closePrice} */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data loaded</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}