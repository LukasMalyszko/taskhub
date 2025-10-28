'use client'

import Link from 'next/link'
import './Navbar.scss'

export const Navbar = () => {
  return (
    <header className="navbar">
      <nav className="navbar__nav">
        <Link href="/" className="navbar__logo">
          <div className="navbar__logo-icon">T</div>
          <span className="navbar__logo-text">TaskHub</span>
        </Link>
        <div className="navbar__nav-links">
          <Link href="/" className="navbar__nav-link">
            Home
          </Link>
          <Link href="/tasks" className="navbar__nav-link">
            Tasks
          </Link>
          <Link href="/about" className="navbar__nav-link">
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}