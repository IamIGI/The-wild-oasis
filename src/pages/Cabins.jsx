import { useEffect } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';

function Cabins() {
  useEffect(() => {
    const fetchCabins = async () => {
      const data = await getCabins();
      console.log(data);
    };

    fetchCabins();
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://bxmaltcawkcfynthgfkk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" />
    </Row>
  );
}

export default Cabins;
