declare global {
    interface Window {
        ethereum?: any;
    }
}

export interface UserProfile {
    address: string;
    username?: string;
    bio?: string;
    avatar?: string;
    createdAt: number;
    reputation: number;
    prompts: {
        created: string[];
        purchased: string[];
    };
    stats: {
        totalSales: number;
        totalPurchases: number;
        totalEarnings: string;
    };
}

export interface AuthState {
    isConnected: boolean;
    address: string | null;
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
}

export interface AuthStore extends AuthState {
    connect: () => Promise<void>;
    disconnect: () => void;
    updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}
