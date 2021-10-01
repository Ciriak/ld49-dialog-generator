import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useLibrary from '../../hooks/useLibrary';

export default function ManualEditor() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditValue(JSON.stringify(library));
    setShow(true);
  };
  const { library, setLibrary } = useLibrary();
  const [editValue, setEditValue] = useState('');
  //   function handleExport() {
  //     saveTemplateAsFile('library.json', library);

  function apply() {
    setLibrary(JSON.parse(editValue));
    toast('Changes applied !', { type: 'success' });
  }
  //   }
  return (
    <>
      <Button onClick={handleShow}>Manual editing</Button>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Manual editing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            defaultValue={editValue}
            className="form-control"
            rows={10}
            onChange={(e) => {
              setEditValue(e.target.value);
            }}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={apply}>
            Apply changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
