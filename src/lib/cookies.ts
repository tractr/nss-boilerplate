export const LANGUAGE_COOKIE = 'NEXT_LOCALE';

export function setLanguageCookie(locale: string) {
  document.cookie = `${LANGUAGE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
}
