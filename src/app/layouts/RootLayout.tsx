import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4cfc4]">
      <Navbar />
      <Outlet />
    </div>
  );
}
