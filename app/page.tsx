import { posts } from '@/lib/posts';
import { PostList } from '@/components/post-list';
import { site } from '@/lib/site';
import {
  ArrowRight,
  LockKeyhole,
  BookOpen,
  Compass,
  Timer,
} from 'lucide-react';
import { pageMeta } from '@/lib/meta';
export const metadata = pageMeta(
  'A little space to move forward',
  'A private journaling companion for OCD and ERP practice. Structured prompts, intentional stopping points, and room for what matters.',
  '/',
);
export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">A companion for the everyday</p>
          <h1>
            A little space
            <br />
            to move <em>forward.</em>
          </h1>
          <p className="lede">
            When thoughts go in circles, find a place to pause. PocketFox brings
            structure to journaling and reflection—with room for uncertainty,
            and for the life around it.
          </p>
          <div className="actions">
            <a className="cta" href="/beta/">
              Explore the beta <ArrowRight size={18} />
            </a>
            <a className="text-link" href="#meet-pocketfox">
              Meet PocketFox ↘
            </a>
          </div>
          <p className="quiet-note">
            <LockKeyhole size={15} /> Private by design. Your journal stays with
            you.
          </p>
        </div>
        <figure className="hero-art">
          <span className="art-label">
            A small companion.
            <br />
            Your own pace.
          </span>
          <div className="art-frame"><img
            src="/art/fox-morning.webp"
            width="256"
            height="256"
            alt="PocketFox morning journal illustration"
          /></div>
          <figcaption className="art-foot">Less untangling. More living.</figcaption>
        </figure>
      </section>
      <div className="principles wrap">
        <span>On-device journaling</span>
        <span>Intentional stopping points</span>
        <span>No app account required</span>
      </div>
      <section id="meet-pocketfox" className="section wrap intro">
        <p className="eyebrow">Meet PocketFox</p>
        <h2>
          A place to reflect.
          <br />
          <em>Then return to your day.</em>
        </h2>
        <div>
          <p>
            PocketFox is a private journaling companion with structured prompts
            and tools for people practicing exposure and response prevention
            (ERP).
          </p>
          <p>
            There are prompts to begin with, space to notice what came up, and a
            stopping point. You don’t have to find a perfect answer before
            moving on.
          </p>
          <a className="text-link" href="/about/">
            Our purpose and boundaries <ArrowRight size={17} />
          </a>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Small tools, thoughtfully made</p>
            <h2>Support for your practice.</h2>
          </div>
          <p>
            Use what fits. Leave what doesn’t.
            <br />
            Your pace is your own.
          </p>
        </div>
        <div className="feature-grid">
          <article className="feature">
            <BookOpen />
            <h3>Begin with a prompt</h3>
            <p>
              A Morning Anchor, an evening Wind Down, or a quick prompt gives
              reflection a little shape.
            </p>
            <img
              src="/art/fox-quick-prompt.webp"
              width="280"
              height="280"
              loading="lazy"
              alt=""
            />
          </article>
          <article className="feature">
            <Timer />
            <h3>Make room for a stopping point</h3>
            <p>
              Timed journal practices help define when to begin and when to set
              your writing down.
            </p>
            <img
              src="/art/fox-wind-down.webp"
              width="280"
              height="280"
              loading="lazy"
              alt=""
            />
          </article>
          <article className="feature">
            <Compass />
            <h3>Remember what matters</h3>
            <p>
              Personal values, Fear Ladders, and a Focus Plan keep your own
              intentions close to hand.
            </p>
            <img
              src="/art/fox-checklist.webp"
              width="280"
              height="280"
              loading="lazy"
              alt=""
            />
          </article>
        </div>
      </section>
      <section className="privacy-band">
        <div className="wrap privacy-inner">
          <LockKeyhole size={38} />
          <div>
            <p className="eyebrow">Yours to keep</p>
            <h2>Your thoughts don’t need an audience.</h2>
            <p>
              The app stores journal content on your device. You choose what to
              export and share. This website has no added analytics, advertising
              pixels, or embedded forms.
            </p>
            <a className="text-link" href="/privacy/">
              Read how privacy works <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The PocketFox journal</p>
            <h2>Room for a different perspective.</h2>
          </div>
          <a className="text-link" href="/blog/">
            Visit the journal <ArrowRight size={17} />
          </a>
        </div>
        {posts.length ? (
          <PostList posts={posts.slice(0, 3)} />
        ) : (
          <div className="empty-editorial">
            <span className="issue-number">01 / In the making</span>
            <h3>A thoughtful reading space, taking shape.</h3>
            <p>
              We’re preparing articles, perspectives, and notes about using
              PocketFox. Nothing published yet—and no pressure to keep checking.
            </p>
          </div>
        )}
      </section>
      <section className="wrap beta-panel">
        <img
          src="/art/fox-tail.webp"
          width="150"
          height="150"
          loading="lazy"
          alt=""
        />
        <div>
          <p className="eyebrow">Help shape what comes next</p>
          <h2>
            A small beginning.
            <br />
            An open invitation.
          </h2>
          <p>
            Learn about the upcoming PocketFox beta and what taking part will
            involve.
          </p>
          <a className="cta" href="/beta/">
            About beta testing <ArrowRight size={18} />
          </a>
        </div>
      </section>
      <div className="wrap disclaimer">{site.disclaimer}</div>
    </>
  );
}
