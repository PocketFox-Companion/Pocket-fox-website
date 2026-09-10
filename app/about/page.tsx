import { pageMeta } from '@/lib/meta';
import { site } from '@/lib/site';
export const metadata = pageMeta(
  'About PocketFox',
  'The purpose and boundaries of PocketFox Companion: private, structured journaling and support for personal ERP practice.',
  '/about/',
);
export default function About() {
  return (
    <>
      <header className="page-head wrap">
        <p className="eyebrow">Our purpose</p>
        <h1>
          A companion.
          <br />
          <em>Not another thing to get right.</em>
        </h1>
        <p className="lede">
          A private space for reflection, with structure to help you set it
          down.
        </p>
      </header>
      <article className="prose">
        <h2>What PocketFox is</h2>
        <p>
          PocketFox Companion offers structured journal prompts, timed
          practices, a place to record exposures, and tools for keeping personal
          values in view. It is designed for people practicing ERP, including
          alongside a clinician.
        </p>
        <h2>Writing with an ending</h2>
        <p>
          Morning Anchor and Wind Down provide timed, structured prompts. Other
          tools include quick prompts, Fear Ladders, a Focus Plan, and a
          personal Values page. You choose the tools that fit your own practice.
        </p>
        <p>
          Writing isn’t a requirement to resolve every thought. PocketFox’s
          approach leaves room to stop without certainty. If a tool becomes part
          of a repetitive checking or reassurance pattern, discuss how you use
          it with your clinician.
        </p>
        <h2>Your words stay yours</h2>
        <p>
          The app source stores journal content on the device and provides
          export and deletion controls. Backups you export are yours to look
          after. The website has a separate privacy policy covering hosting and
          any future beta registration.
        </p>
        <h2>What PocketFox is not</h2>
        <p>{site.disclaimer}</p>
        <p>
          It does not promise symptom improvement, make treatment decisions, or
          provide emergency support.
        </p>
        <a href="/privacy/">Read the privacy policy</a>
      </article>
    </>
  );
}
