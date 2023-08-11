import AuthProvider from "@/providers/AuthProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
