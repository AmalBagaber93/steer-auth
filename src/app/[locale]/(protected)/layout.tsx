import { getUserServer } from '@/src/api/auth/server/get-user';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const STEP_REDIRECTS: Record<string, string> = {
  complete_registration: '/complete-registration',
  email_verification: '/email-verification',
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pathname = (await headers()).get('x-pathname') ?? '';

  const userDetailsResponse = await getUserServer();
  const userDetailsData = userDetailsResponse?.data;


  if (!userDetailsData) {
    if (pathname.includes('confirm-email')) {
      return <>{children}</>;
    }
    redirect(`/${locale}/auth/login`);
  }

  const targetPath = STEP_REDIRECTS[userDetailsData.step];

  if (targetPath && !pathname.includes(targetPath)) {
    const email = userDetailsData.step === 'email_verification'
      ? `?email=${encodeURIComponent(userDetailsData.email ?? '')}`
      : '';
    redirect(`/${locale}${targetPath}${email}`);
  }

  return <>{children}</>;
}
