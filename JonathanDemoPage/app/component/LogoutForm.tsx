'use client'

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LogoutForm() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Nếu signOut() không ném lỗi, chúng ta coi như đăng xuất thành công
      toast.success('Đăng xuất thành công');
      router.push('/login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      toast.error('Đăng xuất thất bại');
    }
  };

  return (
    <form action={handleSignOut}>
      <button type="submit" className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Log out</div>
      </button>
    </form>
  );
}