import React from 'react'

type Props = {
  title?: string
  body?: string
  loading?: boolean
}

export default function ItemCard({ title, body, loading }: Props) {
  if (loading) {
    return (
      <article className="card">
        <div className="card-row">
          <div className="skeleton avatar" />
          <div style={{ flex: 1 }}>
            <div className="skeleton title" />
            <div className="skeleton text" style={{ width: '40%' }} />
          </div>
        </div>
        <div className="skeleton text" style={{ marginTop: 8 }} />
        <div className="skeleton text" style={{ marginTop: 6, width: '80%' }} />
      </article>
    )
  }

  return (
    <article className="card">
      <div className="card-row">
        <div className="avatar" />
        <div style={{ flex: 1 }}>
          <h3>{title}</h3>
          <div className="meta">By Mock User • {Math.floor(Math.random() * 1000)} likes</div>
        </div>
      </div>
      <p>{body}</p>
    </article>
  )
}
