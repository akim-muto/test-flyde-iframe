import { CodeNode } from "@flyde/core"
import sharp from 'sharp'
import { Buffer } from 'buffer'
import fs from "fs"

export const ColortoRedNode: CodeNode = {
  id: "ColortoRedNode",
  displayName: "ColortoRedNode",
  description: "Color to Red",
  inputs: { image: { description: "Image" } },
  outputs: { result: { description: "result image" } },
  run: async (image, { result }) => {
    
    // // 画像をRGB加工
    const processedBuffer = await sharp(image.image)
      .modulate({
        brightness: 60,
        saturation: 60,
        lightness: 60,
      })
      .tint({ r: 255, g: 0, b: 0 })
      .toBuffer()

    result.next(processedBuffer)
  },
};