import ResetPasswordScreen from '@/src/compontents/screens/steer-screen/reset-password-screen/reset-password-screen';

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ResetPasswordScreen token={token} />;
}
