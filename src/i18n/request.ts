import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import fs from "fs/promises";
import path from "path";

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");
    const defaultLocale = "en";
    let locale = acceptLanguage?.split("-")[0] ?? defaultLocale;

    const localePath = path.join(process.cwd(), `locales/${locale}.json`);
    if (!(await fs.access(localePath).then(() => true).catch(() => false))) {
        locale = defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../locales/${locale}.json`)).default,
    };
});
