import { CodeNode } from "@flyde/core"
import sharp from 'sharp'
import { Buffer } from 'buffer'
import fs from "fs"

export const GetImageNode: CodeNode = {
  id: "GetImageNode",
  displayName: "GetImageNode",
  description: "Get Image",
  inputs: { image: { description: "Image" } },
  outputs: { result: { description: "result image url" } },
  run: async (image, { result }) => {

    const bufferToBlob = (buffer: Buffer, mimeType: string): Blob => {
      return new Blob([buffer], { type: mimeType });
    };

    const res = await fetch('http://localhost:5173/image')
    const abuff = await res.arrayBuffer()
    const buff = Buffer.from(abuff)

    // const ab = await data.arrayBuffer()

    // // 画像をRGB加工
    // const processedBuffer = await sharp(buff)
    //   .flop()
    //   .modulate({
    //     brightness: 60,
    //     saturation: 60,
    //     lightness: 60,
    //   })
    //   .tint({ r: 255, g: 0, b: 0 })
    //   .toBuffer()
    // const resultBlob = new Blob([processedBuffer])

    // await fetch('http://localhost:5173/upload2', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'image/png'
    //   },
    //   body: resultBlob
    // })

    result.next(buff)
  },
};