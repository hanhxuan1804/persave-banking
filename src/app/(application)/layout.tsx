import React from 'react';
import { redirect } from 'next/navigation';

import InitData from '@/components/InitData';
import Sidebar from '@/components/sidebar/Sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { TUser } from '@/types/user';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();
  if (!user) redirect('/signin');
  const appUser: TUser = JSON.parse(user) as TUser;
  return (
    <section>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-svh max-h-svh min-w-full overflow-hidden rounded-lg border"
      >
        {/* menu section */}
        <ResizablePanel defaultSize={20} className="min-w-52">
          <div
            data-testid="slider"
            className="flex h-svh max-h-svh w-full items-center justify-center p-6"
          >
            <Sidebar user={appUser} />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80} className="min-w-[600px]">
          <div
            data-textid="content"
            className="flex h-full items-center justify-center overflow-y-scroll"
          >
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <InitData />
    </section>
  );
}
