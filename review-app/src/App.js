import React, { useState, useEffect, useRef, useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import GlobalContext from "./store/globalContext";

function App() {
  const { state, dispatch } = useContext(GlobalContext);

  const inputRef = useRef();

  const usernameRef = useRef();
  const productNameRef = useRef();
  const productPriceRef = useRef();

  const [userInput, setUserInput] = useState("");

  const [starWars, setStarWars] = useState({});

  const checkRef = () => {
    alert(inputRef.current.value);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const getData = () => {
    axios
      .get("https://www.swapi.tech/api/people/1")
      .then((res) => {
        console.log(res.data.result);
        setStarWars(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeUsername = (e) => {
    e.preventDefault()
    dispatch({type: "CHANGEUSERNAME", payload: usernameRef.current.value})
  };

  const addProduct = (e) => {
    e.preventDefault()
    const newProduct = {
      name: productNameRef.current.value,
      price: productPriceRef.current.value
    }
    dispatch({type: "ADDPRODUCT", payload: newProduct})
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App col-container">
      <Header />
      <div className="card">
        <h2>useState</h2>
        <input type="text" onChange={(e) => setUserInput(e.target.value)} />
        <h4>State: {userInput}</h4>
      </div>

      <div className="card">
        <h3>UseEffect + axios</h3>
        <h4>{starWars.properties?.name}</h4>
      </div>

      <div className="card">
        <h3>UseRef</h3>
        <input type="text" ref={inputRef} />
        <button onClick={checkRef}>Ref Button</button>
      </div>

      <div className="card">
        <h3>useContext + useReducer</h3>
        <h4>Username: {state.username}</h4>
        <h4>Person: #{state.person}</h4>
        <h4>Total: ${state.total}</h4>
        {state.products.map((product) => {
          return <p>{product.name}</p>;
        })}
      </div>

      <div className="card col-container">
        <h3>Interact with Context</h3>

        <form onSubmit={changeUsername}>
          <input type="text" placeholder="Enter Username" ref={usernameRef}/>
          <button>Change it</button>
        </form>

        <form onSubmit={addProduct}>
          <input type="text" placeholder="Name" ref={productNameRef}/>
          <input type="number" placeholder="Price" ref={productPriceRef}/>
          <button>Add Product</button>
        </form>

      </div>
    </div>
  );
}

export default App;
