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
            <th>titulo teste 1</th>
            <th>titulo teste 2</th>
            <th>titulo teste 3</th>
          </tr>
          <tr>
            <td>linha teste 1</td>
            <td>linha teste 2</td>
            <td>linha teste 3</td>
          </tr>
          <tr>
            <td>linha teste 1</td>
            <td>linha teste 2</td>
            <td>linha teste 3</td>
          </tr>
          <tr>
            <td>linha teste 1</td>
            <td>linha teste 2</td>
            <td>linha teste 3</td>
          </tr>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Selecionar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EquipModal;
