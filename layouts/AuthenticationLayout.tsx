
export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[90vh]">
      <main className="dark:bg-gray-900 bg-gray-100 h-auto flex-grow ">
        {children}
      </main>
    </div>
  );
}
