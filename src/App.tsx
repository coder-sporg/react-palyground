import { transform } from '@babel/standalone'
import { PluginObj } from '@babel/core'

function App() {
  const code1 = `
    function add(a, b) {
      return a + b;
    }
  `

  const url = URL.createObjectURL(
    new Blob([code1], {
      type: 'application/javascript',
    })
  )

  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url
      },
    },
  }

  const code = `import { add } from './add.ts'; console.log(add(2, 3));`

  function onClick() {
    const res = transform(code, {
      presets: ['react', 'typescript'],
      filename: 'test.ts',
      plugins: [transformImportSourcePlugin],
    })
    console.log(res.code)
  }

  return (
    <div>
      <button onClick={onClick}>编译</button>
    </div>
  )
}

export default App
