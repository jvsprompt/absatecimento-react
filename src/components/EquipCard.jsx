// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import '../css/EquipCard.css';

function EquipCard({ id, name, tag, equipament, local, image }) {
  return (
    <Card className='equip-card' key={ id }>
      <Card.Img variant="top" src={ image } />
      <Card.Body>
        <Card.Title>{ name }</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <Card.Text>{`TAG: ${ tag }`}</Card.Text>
        <Card.Text>{`Equipamento: ${equipament}`}</Card.Text>
        <Card.Text>{`Setor: ${local}`}</Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default EquipCard;
