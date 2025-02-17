import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'
import JSZip from 'jszip'
import saveAs from 'file-saver'
import { Files } from './PlaygroundContext'

export const fileName2Language = (name: string) => {
  const suffix = name.split('.').pop() || ''
  if (['js', 'jsx'].includes(suffix)) return 'javascript'
  if (['ts', 'tsx'].includes(suffix)) return 'typescript'
  if (['json'].includes(suffix)) return 'json'
  if (['css'].includes(suffix)) return 'css'
  return 'javascript'
}

export function compress(data: string): string {
  // 把字符串转为字节数组
  const buffer = strToU8(data)
  // 压缩
  const zipped = zlibSync(buffer, { level: 9 })
  // 转字符串
  const str = strFromU8(zipped, true)
  // 将二进制字符串编码为 base64 的 ASC
  return btoa(str)
}

export function unCompress(base64: string): string {
  // 对 base64 字符串 解码
  const binary = atob(base64)

  const buffer = strToU8(binary, true)
  const unzipped = unzlibSync(buffer)
  return strFromU8(unzipped)
}

// 代码下载和压缩
export async function downloadFiles(files: Files) {
  const zip = new JSZip()

  Object.keys(files).forEach(name => {
    zip.file(name, files[name].value)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`)
}
