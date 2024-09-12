import classnames from 'classnames'
import React, { useState, useRef, useEffect } from 'react'
import { Popconfirm } from 'antd'
import styles from './index.module.scss'

export interface FileNameItemProps {
  value: string
  activated: boolean
  onEditComplete: (name: string) => void
  creating: boolean // 新增
  readonly: boolean // 只读文件不能修改和删除
  onClick: () => void
  onRemove: () => void
}

export const FileNameItem: React.FC<FileNameItemProps> = props => {
  const {
    value,
    activated = false,
    creating, // 是否新增
    readonly,
    onClick,
    onEditComplete,
    onRemove,
  } = props

  const [name, setName] = useState(value)

  const [editing, setEditing] = useState(creating)
  const inputRef = useRef<HTMLInputElement>(null)

  // 双击编辑文件名称
  const handleDoubleClick = () => {
    setEditing(true)
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)
  }

  const handleInputBlur = () => {
    setEditing(false)
    onEditComplete(name)
  }

  useEffect(() => {
    if (creating) {
      inputRef.current?.focus()
    }
  }, [creating])

  return (
    <div
      className={classnames(
        styles['tab-item'],
        activated ? styles.activated : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles['tabs-item-input']}
          value={name}
          onBlur={handleInputBlur}
          onChange={e => setName(e.target.value)}
        />
      ) : (
        <>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly ? (
            <Popconfirm
              title="确认删除该文件吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={e => {
                e?.stopPropagation()
                onRemove()
              }}
            >
              <span style={{ marginLeft: 5, display: 'flex' }}>
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </Popconfirm>
          ) : null}
        </>
      )}
    </div>
  )
}
