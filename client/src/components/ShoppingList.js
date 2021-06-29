import React, { useState, useContext, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Context as ItemContext } from "../context/ItemsContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ErrorContext } from "../context/ErrorContext";

const ShoppingList = () => {
  const [items, setItems] = useState()
  const { state, getItems, id, deleteItem } = useContext(ItemContext);
  const { loadUser } = useContext(AuthContext);
  const {} = useContext(ErrorContext);

  useEffect(() => {
    getItems();
    loadUser();
    console.log("rsh");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {state.items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setItems(items.filter((item) => item.id !== id));
                    deleteItem(_id);
                  }}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;