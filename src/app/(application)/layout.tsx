import Sidebar from '@/components/sidebar/Sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-svh w-full rounded-lg border"
      >
        {/* menu section */}
        <ResizablePanel defaultSize={20} className="min-w-52">
          <div className="flex h-full items-center justify-center p-6">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex h-full items-center justify-center p-6">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
}
