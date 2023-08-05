"use client"
import Canvas from "./components/Canvas";

export default function Home() {

  const canvas = <Canvas />

  return (
    <div style={{
      display: "flex",
      margin: "60px auto"
    }}>
      <Canvas />
    </div>
  )
}
