"use client"
import Canvas from "./components/Canvas";
// import { Provider } from "react-redux";
// import store from "./store";

export default function Home() {

  const canvas =  <Canvas />

  return (
    // <Provider store={store}>
      <div style={{
        display: "flex",
        border: "1px solid red",
        margin: "60px auto"
      }}>
        <Canvas />
      </div>
    // </Provider>
  )
}
