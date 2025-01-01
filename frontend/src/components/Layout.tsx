import { ReactNode } from "react";
import { WalletConnect } from "./WalletConnect";
import { useAuthStore } from "../store/auth.store";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isConnected } = useAuthStore();

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white border-b border-gray-200'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-blue-600'>Sufle</h1>
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-8'>
        {!isConnected ? (
          <div className='text-center py-12'>
            <h2 className='text-xl font-semibold text-gray-700'>
              Connect your wallet to access Sufle
            </h2>
            <p className='mt-2 text-gray-600'>
              Explore and trade AI prompts in a decentralized marketplace
            </p>
          </div>
        ) : (
          children
        )}
      </main>

      <footer className='bg-white border-t border-gray-200 mt-auto'>
        <div className='container mx-auto px-4 py-4'>
          <p className='text-center text-gray-600 text-sm'>
            © 2024 Sufle. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
