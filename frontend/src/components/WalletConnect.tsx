import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';

export const WalletConnect = () => {
  const { isConnected, address, connect, disconnect, isLoading, error } = useAuthStore();

  const handleConnect = useCallback(async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, [connect]);

  if (isLoading) {
    return <button className="px-4 py-2 bg-gray-200 rounded-lg" disabled>Connecting...</button>;
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <button
          onClick={disconnect}
          className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleConnect}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Connect Wallet
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}; 