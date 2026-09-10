import { sitePath } from '@/lib/paths.mjs';
import { pageMeta } from '@/lib/meta';
import { site } from '@/lib/site';
export const metadata = pageMeta(
  'Beta testing',
  'Learn about the upcoming PocketFox Companion beta and how registration will work.',
  '/beta/',
);
export default function Beta() {
  const ready = Boolean(
    site.betaFormUrl &&
    site.privacyEmail &&
    site.betaRetention &&
    site.betaAgeRequirement,
  );
  return (
    <>
      <header className="page-head wrap">
        <p className="eyebrow">Help shape PocketFox</p>
        <h1>
          A small beginning.
          <br />
          <em>Made better together.</em>
        </h1>
        <p className="lede">
          We’re preparing a beta for people who would like to try PocketFox and
          share feedback on the experience.
        </p>
      </header>
      <article className="prose">
        <h2>What taking part will mean</h2>
        <p>
          Try the app’s interface, notice what is clear or confusing, and tell
          us about practical issues. Beta software can change and may contain
          bugs. Participation is optional.
        </p>
        <p>
          We won’t ask you to submit journal entries, diagnoses, symptoms, or
          other health information through the registration form.
        </p>
        <div className="beta-map" aria-label="What the registration covers">
          <div className="beta-map-item">
            <span className="beta-map-number">01</span>
            <strong>Testing focus</strong>
            <span>Usability, ERP-informed feedback, bugs, and design.</span>
          </div>
          <div className="beta-map-item">
            <span className="beta-map-number">02</span>
            <strong>Your setup</strong>
            <span>iPhone model, iOS version, and TestFlight comfort.</span>
          </div>
          <div className="beta-map-item">
            <span className="beta-map-number">03</span>
            <strong>Your boundaries</strong>
            <span>Optional familiarity details, age confirmation, and contact.</span>
          </div>
        </div>
        <h2>Registration</h2>
        {ready ? (
          <>
            <div className="notice beta-form-intro">
              <p>
                The registration form is hosted by Google and appears below in
                a PocketFox-styled frame. Google processes the information you
                submit under its own policies. The PocketFox beta team will use
                it to coordinate testing and contact you about the beta.
              </p>
              <p>
                Retention: {site.betaRetention}. To request deletion, email{' '}
                <a href={'mailto:' + site.privacyEmail}>{site.privacyEmail}</a>.
                Eligibility: {site.betaAgeRequirement}.
              </p>
            </div>
            <div className="beta-form-frame">
              <iframe
                title="PocketFox beta tester registration"
                src={site.betaFormUrl}
                loading="lazy"
              />
            </div>
            <p className="beta-form-fallback">
              Prefer a separate window?{' '}
              <a href={site.betaFormUrl} target="_blank" rel="noopener noreferrer">
                Open the registration form ↗
              </a>
            </p>
          </>
        ) : (
          <div className="notice">
            <p>
              <strong>Registration is not open yet.</strong>
            </p>
            <p>
              We’re finalizing eligibility, the registration form, and contact
              and deletion details before collecting any information.
            </p>
            <span className="disabled-cta" aria-disabled="true">
              Beta registration · coming soon
            </span>
          </div>
        )}
        <p>
          <a href={sitePath('/privacy/')}>Read the privacy policy before registering</a>.
        </p>
        <p>{site.disclaimer}</p>
      </article>
    </>
  );
}
