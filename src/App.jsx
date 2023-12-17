import { useContext, useEffect } from 'react'
import './App.css'
import routerElements from './routes/Router'
import { LocalStorageEventTarget } from './common/auth'
import { AppContext } from './contexts/App'

function App() {
    const routers = routerElements()
    const { reset } = useContext(AppContext)
    useEffect(() => {
        LocalStorageEventTarget.addEventListener('clearLS', reset)

        return () => {
            LocalStorageEventTarget.removeEventListener('clearLS', reset)
        }
    }, [reset])
    return <main>{routers}</main>
}

export default App
