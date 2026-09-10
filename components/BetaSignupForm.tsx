'use client';

import { useState } from 'react';

const formAction =
  'https://docs.google.com/forms/d/e/1FAIpQLSfX3VdaGNK92KGduD97DCK-nq961AFd06X87t5OOMveym0l_g/formResponse';

export default function BetaSignupForm() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = () => {
    window.setTimeout(() => setSubmitted(true), 700);
  };
  return (
    <>
      <iframe name="pocketfox-form-submit" title="Hidden form submission target" className="visually-hidden" />
      {submitted ? (
        <output className="beta-success">
          <p className="eyebrow">Thank you 🦊</p>
          <h3>You’re on the PocketFox beta list.</h3>
          <p>We’ll follow up by email with TestFlight details and next steps.</p>
        </output>
      ) : (
        <form className="pocketfox-form" action={formAction} method="POST" target="pocketfox-form-submit" onSubmit={onSubmit}>
          <fieldset>
            <legend>What kind of testing interests you?</legend>
            <label><input type="checkbox" name="entry.398725579" value="iPhone App Testing — navigation, buttons, layouts, bugs, crashes, confusing screens, and overall usability." required /> iPhone app testing</label>
            <label><input type="checkbox" name="entry.398725579" value="OCD / ERP-Informed Testing — feedback on the app’s language, exercises, tools, and overall approach." /> OCD / ERP-informed testing</label>
          </fieldset>

          <div className="form-grid">
            <label>iPhone model<input name="entry.643543159" required placeholder="iPhone 16 Pro Max" /></label>
            <label>iOS version<input name="entry.1037109840" required placeholder="iOS 18.6" /></label>
          </div>

          <fieldset>
            <legend>OCD / ERP familiarity <span>(optional)</span></legend>
            {['I have personal experience with OCD/ERP','I support or care for someone with OCD','I have professional or educational experience with OCD/ERP','I am generally familiar with OCD/ERP','I don’t have experience with OCD/ERP','Prefer not to say'].map((option) => <label key={option}><input type="radio" name="entry.649948868" value={option} /> {option}</label>)}
          </fieldset>

          <fieldset>
            <legend>What would you most like to help test?</legend>
            {['General usability and navigation','Bugs, crashes, or technical problems','Different iPhone screen sizes','Intrusive-thought/ERP tools','Journaling features','OCD/ERP language and tone','Accessibility/readability','Overall design and appearance','I’m happy to test anything'].map((option) => <label key={option}><input type="checkbox" name="entry.2051391267" value={option} /> {option}</label>)}
          </fieldset>

          <fieldset>
            <legend>TestFlight</legend>
            {['Yes','Yes, but I may need instructions','No / I’m not sure'].map((option) => <label key={option}><input type="radio" name="entry.1063633632" value={option} /> {option}</label>)}
          </fieldset>
          <fieldset>
            <legend>How much testing would you realistically like to do?</legend>
            {['Try the app and give first impressions','Use it several times and report anything I notice','Test specific features when requested','Be an ongoing beta tester for future versions'].map((option) => <label key={option}><input type="radio" name="entry.1625081944" value={option} /> {option}</label>)}
          </fieldset>

          <label>Anything else you’d like us to know? <span>(optional)</span><textarea name="entry.666958898" rows={4} placeholder="Please don’t include sensitive health information or details of intrusive thoughts." /></label>
          <div className="form-grid">
            <label>Name or preferred name<input name="entry.352857600" /></label>
            <label>Email address<input type="email" name="entry.1730971114" required /></label>
          </div>
          <fieldset>
            <legend>Before submitting</legend>
            {['I understand PocketFox is beta software and may contain bugs.','I understand PocketFox is not a substitute for professional mental health care, diagnosis, or treatment.','I understand PocketFox does not provide emergency or crisis services.','I understand participation is voluntary and I can stop testing at any time.'].map((option) => <label key={option}><input type="checkbox" name="entry.401309841" value={option} required /> {option}</label>)}
          </fieldset>
          <label className="check-label"><input type="checkbox" name="entry.1637505835" value="I am 18 years of age or older." required /> I am 18 years of age or older.</label>
          <button className="cta" type="submit">Join the beta ↗</button>
          <p className="form-note">Your details are used only to coordinate PocketFox beta testing. Please don’t include private medical information.</p>
        </form>
      )}
    </>
  );
}
