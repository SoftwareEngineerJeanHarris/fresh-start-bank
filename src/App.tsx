import { useState } from 'react'
import AuthScreen from './screens/Auth'
import DashboardScreen from './screens/Dashboard'

export default function App() {
  const [screen, setScreen] = useState<'auth' | 'dashboard'>('auth')
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  if (screen === 'dashboard') {
    return <DashboardScreen onBackToAuth={() => setScreen('auth')} />
  }

  return (
    <AuthScreen
      mode={mode}
      onModeChange={setMode}
      onEnterDashboard={() => setScreen('dashboard')}
    />
  )
}
