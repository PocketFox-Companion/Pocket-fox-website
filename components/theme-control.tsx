'use client';
import { useSyncExternalStore } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
function subscribe(fn: () => void) {
  window.addEventListener('pocketfox-theme', fn);
  window.addEventListener('storage', fn);
  return () => {
    window.removeEventListener('pocketfox-theme', fn);
    window.removeEventListener('storage', fn);
  };
}
function snapshot() {
  return document.documentElement.dataset.theme || 'system';
}
export function ThemeControl() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => 'system');
  function toggle() {
    const next =
      theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('pocketfox-theme', next);
    } catch {}
    window.dispatchEvent(new Event('pocketfox-theme'));
  }
  return (
    <Button
      className="theme-button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={
        'Color theme: ' +
        theme +
        '. Switch to ' +
        (theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system') +
        ' theme.'
      }
      title={'Theme: ' + theme}
    >
      {theme === 'dark' ? <Moon /> : theme === 'light' ? <Sun /> : <Monitor />}
    </Button>
  );
}
