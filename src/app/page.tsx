"use client"
import Canvas from "./components/Canvas";
import ScrollableCanvas from "./components/ScrollableCanvas";

export default function Home() {

  const canvas = <Canvas />

  return (
    <div style={{
      display: "flex",
      margin: "60px auto"
    }}>
      {/* <Canvas /> */}
      <ScrollableCanvas />
    </div>
  )
}
