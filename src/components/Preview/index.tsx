import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import { useContext, useEffect, useRef, useState } from 'react'
// import { compile } from './compiler'
// import Editor from '@/components/Editor'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '@/Playground/files'
import { Message } from '../Message'
import CompilerWorker from './compiler.worker?worker'
import { debounce } from 'lodash-es'

interface MessageData {
  data: {
    type: string
    message: string
  }
}

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

  // useEffect(() => {
  //   const res = compile(files)
  //   setCompiledCode(res)
  // }, [files])
  const compilerWorkerRef = useRef<Worker>()

  // 主线程这边给 worker 线程传递 files，然后拿到 worker 线程传回来的编译后的代码
  useEffect(() => {
    if (!compilerWorkerRef.current) {
      // 子线程编译代码通知主线程
      compilerWorkerRef.current = new CompilerWorker()
      compilerWorkerRef.current.addEventListener('message', ({ data }) => {
        // console.log('worker', data.data)
        if (data.type === 'COMPILED_CODE') {
          setCompiledCode(data.data)
        } else {
          console.error('error', data)
        }
      })
    }
  }, [])

  // 文件变化，主线程通知子线程进行编译
  useEffect(
    debounce(() => {
      compilerWorkerRef.current?.postMessage(files)
    }, 500),
    [files]
  )

  const [error, setError] = useState('')
  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data
    if (type === 'ERROR') {
      setError(message)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

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
      <Message type="error" content={error} />
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
