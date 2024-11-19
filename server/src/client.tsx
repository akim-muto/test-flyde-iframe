import { createRoot } from 'react-dom/client'
import { useState, useEffect, useMemo, useRef, ReactElement } from 'react'
import { ReactPainter } from 'react-painter'
import { promises } from 'dns'

function App() {
  return (
    <>
      <div style={{ height: 300, width: 100, textAlign: "left" }}>
        <h2>React Painter</h2>
        <Up_and_get_painter />
        {/* <h2>get data</h2>
        <Testlabel /> */}
      </div>
    </>
  )
}

const Up_and_get_painter = () => {
  const rpImageUrl = 'http://localhost:5173/image'
  const [rp, setRp] = useState(rpImageUrl)
  const [picBlob, setPicBlob] = useState<null | Blob>(null)
  const [up_flag, setUp_flag] = useState(0)
  const ws = useRef<WebSocket>()
  const rpImageUrl_white = ''

  const savedata = (blob: Blob) => {
    setPicBlob(blob)
  }

  const updata = async () => {
    if (picBlob === null) {
      console.log("picnull")
    }
    else if (picBlob?.size <= 427) {
       console.log("canvas is no change")
    }
    else if (rp =="") {
      console.log("rp == ''")
   }
    else if (picBlob?.size != 0) {
      await fetch('/upload', {
        method: 'PUT',
        headers: {
          'Content-Type': 'blob'
        },
        body: picBlob
      })
      console.log(picBlob)
    } else {
      console.log("size0")
    }
  }

  const checkData = async () => {
    const response = await fetch('/image')
    const data = await response.blob()
    
    data === null && setRp(rpImageUrl_white)
  }

  useEffect(() => {
    console.log("add")
    ws.current = new WebSocket(`http://localhost:3100/ws`)

    ws.current.addEventListener('message', (event) => {
      console.log("event dispatch")

      if (event.data === "update") {
        rp != "" && setUp_flag((prev_up_flag) => prev_up_flag + 1)
        console.log("get message 'update' from websocket")
      }
    })

    checkData()

    return () => {
      console.log("close")
      ws.current && ws.current.close
    }
  }, [])

  useEffect(() => {
    updata()
    // rp === "" && setRp(rpImageUrl)
    console.log("updata")
  }, [up_flag])

  useEffect(() => {
    rp === "" && setUp_flag((prev_up_flag) => prev_up_flag + 1)
    console.log("chanege url")
    
  }, [rp])

  return (
    <div>
      <ReactPainter
        width={100}
        height={100}
        onSave={async blob => {
          savedata(blob)
        }}
        key={up_flag}
        image={rp}
        render={({ triggerSave, getCanvasProps }) => (
          <div>
            <button onClick={triggerSave}>Save Canvas</button>
            <button onClick={() => {
              triggerSave()
              setRp(rpImageUrl_white)
            }}>Restart</button>
            <canvas {...getCanvasProps({
              ref: ref => {
                onmouseup = () => { 
                  rp === "" && setRp(rpImageUrl)
                  triggerSave() }
              }
            })} />
          </div>
        )}
      />
      <div>
        <button onClick={updata}>up data</button>
      </div>
    </div>
  )
}

// const Testlabel = () => {
//   const [up_flag, setUp_flag] = useState(0)
//   const [response, setResponse] = useState<string | null>(null)
//   const ws = useRef<WebSocket>()

//   useEffect(() => {
//     console.log("add")
//     ws.current = new WebSocket(`http://localhost:3100/ws`)

//     ws.current.addEventListener('message', (event) => {
//       console.log("event dispatch")

//       if (event.data === "update") {
//         console.log("update" + up_flag)
//         setUp_flag((prev_up_flag) => prev_up_flag + 1)
//       }
//     })

//     return () => {
//       console.log("close")
//       ws.current && ws.current.close
//     }
//   }, [])

//   useEffect(() => {
//     // 非同期関数を定義してAPI呼び出しを行う
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/clock')
//         const data = await response.json()
//         const headers = Array.from(response.headers.entries()).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
//         const fullResponse = {
//           url: response.url,
//           status: response.status,
//           headers,
//           body: data
//         }

//         setResponse(JSON.stringify(fullResponse, null, 2))
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     // コンポーネントがマウントされた時に実行する
//     console.log("fetchData")
//     fetchData();

//   }, [up_flag]);

//   return (
//     <div>
//       <label>{up_flag}</label>
//       <label> {response && <pre>{response}</pre>} </label>
//     </div>
//   )
// }

const domNode = document.getElementById('root')!
const root = createRoot(domNode)
root.render(<App />)
