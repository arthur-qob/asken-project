import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.scss'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import { UserProvider } from './contexts/userContext'
import { LoadingProvider } from './contexts/loadingContext'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<LoadingProvider>
			<UserProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</UserProvider>
		</LoadingProvider>
	</StrictMode>
)
