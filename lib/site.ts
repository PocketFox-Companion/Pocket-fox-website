export const site = {
  name: 'PocketFox Companion',
  domain: 'https://pocketfoxcompanion.com',
  previewOrigin:
    'https://pocketfox-companion.breakthroughmiraclep.chatgpt.site',
  productionReady: false,
  betaFormUrl: '',
  contactEmail: '',
  privacyEmail: '',
  betaRetention: '',
  betaAgeRequirement: '',
  disclaimer:
    'PocketFox provides educational and self-management support. It is not diagnosis, treatment, or a replacement for a licensed clinician.',
};
export const origin = site.productionReady ? site.domain : site.previewOrigin;
export { default as categories } from '../content/categories.json';
