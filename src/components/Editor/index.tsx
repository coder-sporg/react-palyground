import MonacoEditor, { EditorProps, OnMount } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { createATA } from './ata'

export interface EditorFile {
  name: string
  value: string
  language: string
}

interface Props {
  file: EditorFile
  onChange?: EditorProps['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props

  const handleEditorMount: OnMount = (editor, monaco) => {
    // 格式化代码
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve, // 设置 jsx 的处理
      esModuleInterop: true, // 在编译的时候自动加上 default 属性
    })

    const ata = createATA((code, path) => {
      // 添加到 ts 中
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      )
    })

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue())
    })

    ata(editor.getValue())
  }

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      value={file.value}
      onMount={handleEditorMount}
      onChange={onChange}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false, // 不到最后一行不滚动
        minimap: {
          enabled: false, // 关闭缩略图
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  )
}
