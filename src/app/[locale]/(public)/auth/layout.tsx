import { getUserServer } from '@/src/api/auth/server/get-user';
import LanguageSwitcher from '@/src/compontents/common/language-switcher';
import { redirect } from 'next/navigation';


export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const userDetailsResponse = await getUserServer();
  const userDetailsData = userDetailsResponse?.data;

  if (userDetailsData) {
    redirect(`/${locale}/dashboard`);

  }

  return <>    <>
    <div className="w-full flex justify-end px-8 py-2 bg-slate-50 ">
      <LanguageSwitcher />
    </div>

    {children}
  </></>;
}
