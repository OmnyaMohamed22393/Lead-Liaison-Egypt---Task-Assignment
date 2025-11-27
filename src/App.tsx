import React from 'react'
import Feed from './features/Feed'

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Infinite Scroll Feed</h1>
      </header>
      <main>
        <Feed />
      </main>
    </div>
  )
}
