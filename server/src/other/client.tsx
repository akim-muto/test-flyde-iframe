import { createRoot } from 'react-dom/client'
import { useState, useEffect, useRef } from 'react'

function App() {
  return (
    <>
      <h2>result image</h2>
      <Result />
    </>
  )
}

function Result() {
  const [getBlob, setGetBlob] = useState("")
  const [up_flag, setUp_flag] = useState(0)
  const ws = useRef<WebSocket>()

  const getdata = async () => {
    const response = await fetch('/image2')
    const data = await response.blob()
    const imageUrl = URL.createObjectURL(data)
    setGetBlob(imageUrl)
    console.log(data)
  }

  useEffect(() => {
    console.log("add")
    ws.current = new WebSocket(`http://localhost:3100/ws`)

    ws.current.addEventListener('message', (event) => {
      console.log("event dispatch")

      if (event.data === "update_viewer") {
        setUp_flag((prev_up_flag) => prev_up_flag + 1)
        console.log("get message 'update' from websocket")
      }
    })

    getdata()

    return () => {
      console.log("close")
      ws.current && ws.current.close
      return URL.revokeObjectURL(getBlob)
    }
  }, [])

  useEffect(() => {
    
    getdata()

    return () => {
      return URL.revokeObjectURL(getBlob)
    }
  }, [up_flag])

  return (
    <div>
      <img src={getBlob} key={up_flag}/>
    </div>
  )
}

const domNode = document.getElementById('root')!
const root = createRoot(domNode)
root.render(<App />)
