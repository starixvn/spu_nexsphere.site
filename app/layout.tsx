import '@/src/styles/global.css';
import { inter } from '@/src/component/fonts';
import { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { ClientWrapper } from "@/app/client-wrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: {
    template: 'NexSphere | %s',
    default: 'NexSphere'
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <ClientWrapper session={session}>{children}</ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
