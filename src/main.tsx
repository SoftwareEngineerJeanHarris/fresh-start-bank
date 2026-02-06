import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

const root = document.querySelector('#app')

if (root) {
  createRoot(root).render(<App />)
}
