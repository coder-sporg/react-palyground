import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import { useContext, useEffect, useState } from 'react'
import { compile } from './compiler'
// import Editor from '@/components/Editor'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '@/Playground/files'

export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  const [compiledCode, setCompiledCode] = useState('')

  // 处理 iframe ,替换内容
  const getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl())

  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode])

  useEffect(() => {
    const res = compile(files)
    setCompiledCode(res)
  }, [files])

  return (
    <div style={{ height: '100%' }}>
      <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
        }}
      />
      {/* <Editor
        file={{
          name: 'dist.js',
          value: compiledCode,
          language: 'javascript',
        }}
      /> */}
    </div>
  )
}
