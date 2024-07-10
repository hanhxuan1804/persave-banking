import { redirect } from 'next/navigation';

import PreviewDashboard from '@/components/auth/PreviewDashboard';
import { getLoggedInUser } from '@/lib/actions/user.actions';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();
  if (user) redirect('/dashboard');
  return (
    <section className="grid h-full grid-cols-12 border">
      <div className="col-span-12 h-full lg:col-span-6">{children}</div>
      <div className="hidden min-h-screen bg-[#f3f9ff70] lg:col-span-6 lg:block">
        <PreviewDashboard />
      </div>
    </section>
  );
}
