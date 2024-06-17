import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid h-full grid-cols-12">
      <div className="col-span-12 h-full lg:col-span-6">{children}</div>
      <div className="hidden min-h-screen bg-[#f3f9ff9e] lg:col-span-6 lg:block">
        <div className="flex h-full flex-col items-center justify-center overflow-hidden pl-[50px]">
          <div className="border-foreground relative h-[70%] w-full rounded-[12px] rounded-r-none border-[10px] border-r-0">
            <Image
              src="/auth-illustration.png"
              alt="Illustration"
              width={940}
              height={680}
              className="absolute left-0 top-0 h-full w-[940px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
