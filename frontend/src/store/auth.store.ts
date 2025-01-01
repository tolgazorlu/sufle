import { create } from 'zustand';
import { ethers } from 'ethers';
import type { AuthState, AuthStore, UserProfile } from '../types';

const initialState: AuthState = {
    isConnected: false,
    address: null,
    profile: null,
    isLoading: false,
    error: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
    ...initialState,

    connect: async () => {
        try {
            set({ isLoading: true, error: null });

            if (!window.ethereum) {
                throw new Error('No Web3 wallet found');
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            // Sign message for authentication
            const message = `Welcome to Sufle!\n\nPlease sign this message to authenticate.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.`;
            const signature = await signer.signMessage(message);

            // Here you would typically verify the signature on your backend
            // and get the user profile data

            const mockProfile: UserProfile = {
                address,
                createdAt: Date.now(),
                reputation: 0,
                prompts: { created: [], purchased: [] },
                stats: { totalSales: 0, totalPurchases: 0, totalEarnings: '0' }
            };

            set({
                isConnected: true,
                address,
                profile: mockProfile,
                isLoading: false
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to connect wallet',
                isLoading: false
            });
        }
    },

    disconnect: () => {
        set(initialState);
    },

    updateProfile: async (data) => {
        try {
            set({ isLoading: true, error: null });

            // Here you would typically update the profile on your backend/smart contract

            set((state) => ({
                profile: state.profile ? { ...state.profile, ...data } : null,
                isLoading: false
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to update profile',
                isLoading: false
            });
        }
    }
}));
