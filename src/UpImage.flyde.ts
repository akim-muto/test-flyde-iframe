import { CodeNode } from "@flyde/core"
import sharp from 'sharp'
import { Buffer } from 'buffer'
import fs from "fs"

export const UpImageNode: CodeNode = {
  id: "UpImageNode",
  displayName: "UpImageNode",
  description: "Upload Image",
  inputs: { image: { description: "Image" } },
  outputs: { result: { description: "result image" } },
  run: async (image, { result }) => {
    
    const resultBlob = new Blob([image.image])

    await fetch('http://localhost:5173/upload2', {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/png'
      },
      body: resultBlob
    })

    result.next("ok")
  },
};