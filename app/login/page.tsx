import Logo from '@/src/component/logo';
import LoginForm from '@/src/component/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'LoginPage',
};
 
export default function LoginPage() {
  return (
    <main className="main-content flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Logo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}