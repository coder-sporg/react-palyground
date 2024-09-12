import { useContext } from 'react'
import Editor from '../Editor'
import FileNameList from '../FileNameList'
import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import { debounce } from 'lodash-es'

export default function CodeEditor() {
  const { files, setFiles, selectedFileName } = useContext(PlaygroundContext)

  // 监听文件改变的时候，更新 context 的值
  function onEditorChange(value?: string) {
    files[selectedFileName].value = value!
    setFiles({ ...files })
  }

  const file = files[selectedFileName]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 500)} />
    </div>
  )
}
