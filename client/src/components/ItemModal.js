import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Context as ItemContext } from "../context/ItemsContext";

const ItemModal = () => {
  const { addItem } = useContext(ItemContext);

  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { name: name };

      // Add item via add action
      addItem(newItem);

      setName("");

      //CLose Modal
      toggle();
    } else {
      alert("Enter a shopping item");
    }
  };

  return (
    <div>
      <Button color="dark" onClick={toggle} style={{ marginBottom: "2rem" }}>
        Add Item
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                value={name}
                id="item"
                placeholder="Add Shopping Item"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;