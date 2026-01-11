import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Press_Start_2P } from 'next/font/google';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const pressStart = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-minecraft'
});

export const metadata = {
  title: 'CoralMC - TierList',
  description: 'Minecraft Leaderboard Tier List',
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${pressStart.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
