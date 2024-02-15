import { Navbar } from "@/components/Navbar";
import getNasaPicture from "@/utils/getNasaPicture";

export default  function  DefaultLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    
    <div className=" min-h-[90vh]">
      <Navbar />

      <main className={`container mx-auto max-w-7xl pt-16 px-6 flex-grow  overflow-auto`} >
        {children}
      </main>
    </div>
  );
}
