import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import App from '@/App.jsx'
import { AuthProvider } from '@/lib/auth/AuthContext'
import { ThemeProvider } from '@/lib/theme/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
