'use client'

import './Footer.scss'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <div className="footer__logo-icon">T</div>
          <span className="footer__logo-text">TaskHub</span>
        </div>
        <div className="footer__copyright">
          © {new Date().getFullYear()} TaskHub. Built with Next.js and Redux.
        </div>
      </div>
    </footer>
  )
}