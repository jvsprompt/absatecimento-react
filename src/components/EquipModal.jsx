import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EquipModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Equipamentos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table>
          <tr>
            {props.columns.map((data, i) => (
              <th key={i}>{data}</th>
            ))}
          </tr>
          {props.table.map((data, i) => (
            <tr key={i}>
              <td>{data.tag}</td>
              <td>{data.name}</td>
              {/* <td>{data.unidade}</td> */}
            </tr>
          ))}
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Selecionar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EquipModal;
