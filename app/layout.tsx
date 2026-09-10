import { sitePath } from '@/lib/paths.mjs';
import type { Metadata } from 'next';
import './globals.css';
import { ThemeControl } from '@/components/theme-control';
export const metadata: Metadata = { icons: { icon: sitePath('/favicon.png') } };
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src={sitePath('/theme.js')} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="site-header wrap">
          <a className="brand" href={sitePath('/')} aria-label="PocketFox home">
            <img src={sitePath('/favicon.png')} width="40" height="40" alt="" />
            <span>
              PocketFox<small>COMPANION</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href={sitePath('/about/')}>About</a>
            <a href={sitePath('/blog/')}>Journal</a>
            <a href={sitePath('/privacy/')}>Privacy</a>
          </nav>
          <div className="header-actions">
            <ThemeControl />
            <a className="outline-cta" href={sitePath('/beta/')}>
              Beta testing ↗
            </a>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="wrap site-footer">
          <div>
            <a className="brand" href={sitePath('/')}>
              PocketFox
            </a>
            <p>A little space. Your own pace.</p>
          </div>
          <nav aria-label="Footer">
            <a href={sitePath('/about/')}>About</a>
            <a href={sitePath('/blog/')}>Journal</a>
            <a href={sitePath('/beta/')}>Beta</a>
            <a href={sitePath('/privacy/')}>Privacy</a>
            <a href={sitePath('/feed.xml')}>RSS</a>
          </nav>
          <p className="copyright">
            © {new Date().getFullYear()} PocketFox Companion
          </p>
        </footer>
      </body>
    </html>
  );
}
