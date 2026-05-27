
import { Toaster } from "react-hot-toast";
import "../src/styles/neumorphism.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}