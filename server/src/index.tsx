import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'

type Bindings = {
  MY_BUCKET: R2Bucket
  MY_VAR: string
}

const app = new Hono<{ Bindings: Bindings, }>()

app.put('/upload', async (c) => {

  const data = await c.req.blob()
  if (!data) return c.notFound()
  await c.env.MY_BUCKET.put("update", data)
  
  return c.text('uploaded!')
})

app.get('/image', async (c) =>{
  const image = await c.env.MY_BUCKET.get("update")
  const data = await image?.body
  return new Response(data, {
    headers: {
      "Content-Type": "image/png",
    },
})})

app.put('/upload2', async (c) => {

  const data = await c.req.blob()
  if (!data) return c.notFound()
  await c.env.MY_BUCKET.put("update2", data)
  
  return c.text('uploaded!')
})

app.get('/image2', async (c) =>{
  const image = await c.env.MY_BUCKET.get("update2")
  const data = await image?.body
  return new Response(data, {
    headers: {
      "Content-Type": "image/png",
    },
})})

app.get('/api/clock', (c) => {
  return c.json({
    var: c.env.MY_VAR, // Cloudflare Bindings
    time: new Date().toLocaleTimeString()
  })
})

app.get('/', (c) => {
  console.log(c.req.header.toString)
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          {import.meta.env.PROD ? (
            <script type="module" src="/assets/main/static/client.js"></script>
          ) : (
            <script type="module" src="/src/client.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

app.get('/image-viewer', (c) => {
  console.log(c.req.header.toString)
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <script type="module" src="/src/other/client.tsx"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

export default app
