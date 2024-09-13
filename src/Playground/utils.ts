import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'

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
