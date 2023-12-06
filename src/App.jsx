import { ToastContainer } from 'react-toastify'
import './App.css'
import routerElements from './routes/Router'

function App() {
    const routers = routerElements()
    return <main>{routers}</main>
}

export default App
