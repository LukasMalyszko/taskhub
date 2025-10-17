import { TasksPage, ClientOnly } from '@/components'

export default function Tasks() {
  return (
    <ClientOnly fallback={
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#6b7280'
      }}>
        Loading tasks...
      </div>
    }>
      <TasksPage />
    </ClientOnly>
  )
}