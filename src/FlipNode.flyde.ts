import { CodeNode } from "@flyde/core"
import sharp from 'sharp'
import { Buffer } from 'buffer'
import fs from "fs"

export const FlipNode: CodeNode = {
  id: "FlipNode",
  displayName: "FlipNode",
  description: "Flip Image",
  inputs: { image: { description: "Image" } },
  outputs: { result: { description: "result image" } },
  run: async (image, { result }) => {
    
    // // 画像をRGB加工
    const processedBuffer = await sharp(image.image)
      .flip()
      .toBuffer()

    result.next(processedBuffer)
  },
};