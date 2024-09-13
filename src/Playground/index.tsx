import CodeEditor from '@/components/CodeEditor'
import Header from '@/components/Header'
import Preview from '@/components/Preview'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import './index.scss'
import { useContext } from 'react'
import { PlaygroundContext } from './PlaygroundContext'

export default function Playground() {
  const { theme } = useContext(PlaygroundContext)
  return (
    <div className={theme} style={{ height: '100vh' }}>
      {/* 1比1 的比例展示 */}
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
