import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  const hasLocaleSupport = hasLocale(locale, ['it', 'en']);
  
  return {
    locale: hasLocaleSupport ? locale : 'it',
    messages: (await import(`../messages/${hasLocaleSupport ? locale : 'it'}.json`)).default
  };
});
