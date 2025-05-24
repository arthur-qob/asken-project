import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.scss'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import { UserProvider } from './contexts/UserContext'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<UserProvider>
				<App />
			</UserProvider>
		</BrowserRouter>
	</StrictMode>
)
