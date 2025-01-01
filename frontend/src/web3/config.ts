import { ethers } from 'ethers';

export const CHAIN_ID = import.meta.env.VITE_CHAIN_ID || '0x1'; // Mainnet by default
export const RPC_URL = import.meta.env.VITE_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/your-api-key';

export const getProvider = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    }
    return new ethers.JsonRpcProvider(RPC_URL);
};

export const CONTRACTS = {
    USER_PROFILE: import.meta.env.VITE_USER_PROFILE_CONTRACT || '',
    // Add other contract addresses here
} as const;

export const switchNetwork = async () => {
    if (!window.ethereum) throw new Error('No Web3 wallet found');

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: CHAIN_ID }],
        });
    } catch (error: any) {
        if (error.code === 4902) {
            // Chain not added, implement add chain logic here
            throw new Error('Please add the network to your wallet');
        }
        throw error;
    }
};
