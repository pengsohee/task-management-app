'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getToken, removeToken } from '@/services/auth';
import EditProfileForm from '@/components/EditProfileForm';

interface UserData {
  id: string;
  username: string;
  email: string;
}

export default function EditProfilePage() {
  const { id: routeUserId } = useParams(); // extract the id from URL
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await res.json();
        // Assuming the auth endpoint returns an object with id, username, and email
        setUserData({
          id: data.id,
          username: data.username,
          email: data.email,
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
        removeToken();
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  // Verify that the authenticated user's id matches the id in the route.
  if (routeUserId !== userData?.id) {
    return <p>You are not authorized to edit this profile.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
      {userData ? (
        <EditProfileForm
          userId={userData.id}
          initialData={{ username: userData.username, email: userData.email }}
        />
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
