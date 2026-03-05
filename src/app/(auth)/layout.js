export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      {children}
    </main>
  );
}
