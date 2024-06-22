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
        className="min-h-svh min-w-full rounded-lg border"
      >
        {/* menu section */}
        <ResizablePanel defaultSize={20} className="min-w-52">
          <div
            data-testid="slider"
            className="flex h-full items-center justify-center p-6"
          >
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <div
            data-textid="content"
            className="flex h-full items-center justify-center py-6"
          >
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
}
