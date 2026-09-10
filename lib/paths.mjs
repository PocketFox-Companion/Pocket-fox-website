export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function sitePath(value) { return value.startsWith('/') && !value.startsWith('//') ? basePath + value : value; }
