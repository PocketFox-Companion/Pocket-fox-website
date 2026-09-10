import { pageMeta } from '@/lib/meta';
import { site } from '@/lib/site';
export const metadata = pageMeta(
  'Privacy',
  'How PocketFox distinguishes on-device app content, website hosting, and optional beta registration.',
  '/privacy/',
);
export default function Privacy() {
  return (
    <>
      <header className="page-head wrap">
        <p className="eyebrow">Private by design</p>
        <h1>
          Your thoughts.
          <br />
          <em>Your space.</em>
        </h1>
        <p className="lede">
          Privacy means being specific about what happens where.
        </p>
        <p className="article-meta">
          Updated September 9, 2026 · Website preview policy
        </p>
      </header>
      <article className="prose">
        <div className="notice">
          <p>
            <strong>This site is a development preview.</strong> Beta
            registration is not collecting information. Hosting and contact
            details must be confirmed before the public launch.
          </p>
        </div>
        <h2>1. The PocketFox app</h2>
        <p>
          The app source stores journal entries, exposure logs, and personal
          settings locally in the device’s browser storage. It provides tools to
          export backups and delete local content. Exported files and anything
          you choose to share are outside that local storage and remain under
          your control.
        </p>
        <p>
          Clearing browser storage or uninstalling an app can remove locally
          stored content. Export a backup if you want to keep it.
        </p>
        <p>
          This description is based on a source review. It is not a claim that a
          compiled iOS release has passed an independent dependency or runtime
          network audit. Those release checks remain separate.
        </p>
        <h2>2. This website</h2>
        <p>
          PocketFox has not added analytics, tracking pixels, advertising,
          remote fonts, or third-party embedded forms to this website. Its
          images, styles, and scripts are served from the site itself.
        </p>
        <p>
          Your selected light, dark, or system theme is saved in your browser’s
          local storage. It is not sent to us by the theme control. You can
          clear it by clearing this site’s browser data.
        </p>
        <p>
          This preview uses OpenAI Sites and its hosting infrastructure.
          Requests necessarily include technical information such as an IP
          address, requested URL, and browser headers. Platform access checks
          and operational logs may be handled by the host. We do not claim that
          hosting involves no technical data processing. Exact hosting retention
          and access terms must be reviewed before public launch.
        </p>
        <h2>3. Optional beta registration</h2>
        <p>
          No beta form is currently active. When registration opens, it will use
          an ordinary outbound link to Google Forms. The form will not be
          embedded and Google form resources will not load while you browse
          PocketFox pages.
        </p>
        <p>
          The form will explain what information is requested, why the beta team
          needs it, who can access it, how long it is retained, and how to
          request deletion. Please do not include health information or journal
          content.
        </p>
        <h2>4. Contact and deletion requests</h2>
        {site.privacyEmail ? (
          <p>
            Contact{' '}
            <a href={'mailto:' + site.privacyEmail}>{site.privacyEmail}</a> for
            website or beta privacy questions.
          </p>
        ) : (
          <p>
            A dedicated privacy contact is being configured. Beta registration
            will remain disabled until that contact and the retention policy are
            ready.
          </p>
        )}
        <h2>5. Earlier app policy</h2>
        <p>
          The{' '}
          <a href="https://faded-fox.github.io/OCD/privacy/" rel="noreferrer">
            existing app privacy page
          </a>{' '}
          remains at its original address. This website does not change or
          overwrite the app repository or its published policy.
        </p>
      </article>
    </>
  );
}
