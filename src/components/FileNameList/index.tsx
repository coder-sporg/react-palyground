import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import { useContext, useEffect, useState } from 'react'
import { FileNameItem } from './FileNameItem'
import styles from './index.module.scss'
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from '@/Playground/files'

export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState([''])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  // 修改名称
  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name)
    setSelectedFileName(name)
    setCreating(false)
  }

  const [creating, setCreating] = useState(false)

  // 新增文件
  const addTab = () => {
    const newFileName = 'Comp' + Math.random().toString().slice(2, 6) + '.tsx'
    addFile(newFileName)
    setSelectedFileName(newFileName)
    setCreating(true)
  }

  // 删除文件
  const handleRemove = (name: string) => {
    // e.stopPropagation() // 防止触发 tab 切换
    removeFile(name)
    setSelectedFileName(ENTRY_FILE_NAME)
  }

  // 只读文件不能被删除和编辑
  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ]

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          creating={creating}
          activated={selectedFileName === item}
          readonly={readonlyFileNames.includes(item)}
          onEditComplete={(name: string) =>
            handleEditComplete(name, selectedFileName)
          }
          onClick={() => setSelectedFileName(item)}
          onRemove={() => handleRemove(item)}
        />
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  )
}
