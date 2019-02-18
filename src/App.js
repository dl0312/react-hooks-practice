import React, { Component, useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const onChange = e => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };
  return { value, onChange };
}

function useFetch(url) {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const callUrl = async () => {
    try {
      const { data } = await Axios.get(url);
      setPayload(data);
    } catch {
      setError("😂");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callUrl();
  }, []);
  return { payload, loading, error };
}

function App() {
  const name = useInput("");
  const { payload, loading, error } = useFetch("https://aws.random.cat/meow");
  console.log(name.value);
  return (
    <Container className="App">
      <h1>🐱 Random Cat Image 🐱</h1>
      <input placeholder="what's your name" {...name} />
      <br />
      {loading && <span>Loading your cat</span>}
      {!loading && error && <span>{error}</span>}
      {!loading && payload && <img src={payload.file} width="250" alt="cat" />}
    </Container>
  );
}

export default App;
