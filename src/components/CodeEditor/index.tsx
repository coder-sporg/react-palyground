import Editor from '../Editor'
import FileNameList from '../FileNameList'

export default function CodeEditor() {
  const file = {
    name: 'demo.tsx',
    value: 'import lodash from "lodash";\n\nconst a = <div>demo</div>',
    language: 'typescript',
  }

  function onEditorChange(content: any, changeEvent: any) {
    console.log(content, changeEvent)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  )
}
