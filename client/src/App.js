import React, { useContext } from "react";

//import components
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

//import context
import { Provider as ItemProvider } from "./context/ItemsContext";
import { Context as AuthContext } from "./context/AuthContext";
import { Provider as ErrorProvider } from "./context/ErrorContext";

//styling
import './App.css'

function App() {
  const { state } = useContext(AuthContext);
  return (
    <ErrorProvider>
      <ItemProvider>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </ItemProvider>
    </ErrorProvider>
  );
}

export default App;