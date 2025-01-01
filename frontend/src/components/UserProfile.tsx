import { useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import type { UserProfile as UserProfileType } from '../types';

export const UserProfile = () => {
  const { profile, updateProfile, isLoading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfileType>>({
    username: profile?.username || '',
    bio: profile?.bio || '',
  });

  if (!profile) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bio
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </label>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{profile.username || 'Unnamed User'}</h2>
          <p className="text-sm text-gray-600">{profile.address}</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          Edit Profile
        </button>
      </div>
      
      {profile.bio && (
        <p className="text-gray-700">{profile.bio}</p>
      )}
      
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm text-gray-600">Reputation</p>
          <p className="text-lg font-semibold">{profile.reputation}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="text-lg font-semibold">{profile.stats.totalSales}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Earnings</p>
          <p className="text-lg font-semibold">{profile.stats.totalEarnings} EDU</p>
        </div>
      </div>
    </div>
  );
}; 