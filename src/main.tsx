import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.scss'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	</StrictMode>
)
