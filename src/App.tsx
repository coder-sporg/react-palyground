import Playground from './Playground'
import './App.css'
import { PlaygroundProvider } from './Playground/PlaygroundContext'

function App() {
  return (
    <PlaygroundProvider>
      <Playground />
    </PlaygroundProvider>
  )
}

export default App
