'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Navbar.scss'

export const Navbar = () => {
  const pathname = usePathname()

  const getLinkClassName = (href: string) => {
    const baseClass = 'navbar__nav-link'
    const activeClass = 'navbar__nav-link--active'
    return pathname === href ? `${baseClass} ${activeClass}` : baseClass
  }

  return (
    <header className="navbar">
      <nav className="navbar__nav">
        <Link href="/" className="navbar__logo">
          <div className="navbar__logo-icon">T</div>
          <span className="navbar__logo-text">TaskHub</span>
        </Link>
        <div className="navbar__nav-links">
          <Link href="/" className={getLinkClassName('/')}>
            Home
          </Link>
          <Link href="/tasks" className={getLinkClassName('/tasks')}>
            Tasks
          </Link>
          <Link href="/about" className={getLinkClassName('/about')}>
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}