import type { Metadata } from 'next';
import './globals.css';
import { ThemeControl } from '@/components/theme-control';
export const metadata: Metadata = { icons: { icon: '/favicon.png' } };
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="/theme.js" />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="site-header wrap">
          <a className="brand" href="/" aria-label="PocketFox home">
            <img src="/favicon.png" width="40" height="40" alt="" />
            <span>
              PocketFox<small>COMPANION</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="/about/">About</a>
            <a href="/blog/">Journal</a>
            <a href="/privacy/">Privacy</a>
          </nav>
          <div className="header-actions">
            <ThemeControl />
            <a className="outline-cta" href="/beta/">
              Beta testing ↗
            </a>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="wrap site-footer">
          <div>
            <a className="brand" href="/">
              PocketFox
            </a>
            <p>A little space. Your own pace.</p>
          </div>
          <nav aria-label="Footer">
            <a href="/about/">About</a>
            <a href="/blog/">Journal</a>
            <a href="/beta/">Beta</a>
            <a href="/privacy/">Privacy</a>
            <a href="/feed.xml">RSS</a>
          </nav>
          <p className="copyright">
            © {new Date().getFullYear()} PocketFox Companion
          </p>
        </footer>
      </body>
    </html>
  );
}
