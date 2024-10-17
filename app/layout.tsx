import '@/src/styles/global.css';
import { inter } from '@/src/component/fonts';
import { Metadata } from 'next';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: {
    template: 'NexSphere | %s',
    default: 'NexSphere'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
