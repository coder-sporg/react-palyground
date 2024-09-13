import { MoonOutlined, ShareAltOutlined, SunOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import logoSvg from '@/assets/react.svg'
import { useContext } from 'react'
import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import { message } from 'antd'
import copy from 'copy-to-clipboard'

export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext)
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div>
        {theme === 'light' && (
          <MoonOutlined
            title="切换暗色主题"
            className={styles.theme}
            onClick={() => setTheme('dark')}
          />
        )}
        {theme === 'dark' && (
          <SunOutlined
            title="切换亮色主题"
            className={styles.theme}
            onClick={() => setTheme('light')}
          />
        )}
        <ShareAltOutlined
          style={{ marginLeft: '10px' }}
          onClick={() => {
            copy(window.location.href)
            message.success('分享链接已复制!')
          }}
        />
      </div>
    </div>
  )
}
