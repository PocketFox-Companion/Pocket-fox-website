export const site = {
  name: 'PocketFox Companion',
  domain: 'https://pocketfoxcompanion.com',
  previewOrigin:
    'https://pocketfox-companion.breakthroughmiraclep.chatgpt.site',
  productionReady: false,
  betaFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfX3VdaGNK92KGduD97DCK-nq961AFd06X87t5OOMveym0l_g/viewform?usp=publish-editor',
  contactEmail: 'hello@nomadicpaws.co',
  privacyEmail: 'hello@nomadicpaws.co',
  betaRetention:
    'only as long as needed to coordinate beta testing and follow-up',
  betaAgeRequirement: 'you must be 18 years of age or older',
  disclaimer:
    'PocketFox provides educational and self-management support. It is not diagnosis, treatment, or a replacement for a licensed clinician.',
};
export const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || (site.productionReady ? site.domain : site.previewOrigin);
export { default as categories } from '../content/categories.json';
