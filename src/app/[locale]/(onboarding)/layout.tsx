import { getUserServer } from "@/src/api/auth/server/get-user";
import ScreenHeader from "@/src/compontents/common/layout/screen-header";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const userDetailsResponse = await getUserServer();

  if (!userDetailsResponse?.data) {
    redirect(`/${locale}/auth/login`);
  }

  if (userDetailsResponse?.data.step === "dashboard") {
    redirect(`/${locale}/dashboard`);
  }

  return <>
    <div className="w-full flex justify-end px-8 py-2 bg-slate-50 ">
      <ScreenHeader />
    </div>
    {children}</>;
}
