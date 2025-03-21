'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getToken, removeToken } from '@/services/auth';
import EditProfileForm from '@/components/EditProfileForm';

interface UserData {
  username: string;
  email: string;
}

export default function EditProfilePage() {
  const params = useParams();
  // Adjust how you get userId if your route structure differs
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  const checkAuthAndFetchUser = async () => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!userResponse.ok) throw new Error('Auth failed');
      const data = await userResponse.json();
      setUserData({ username: data.username, email: data.email });
    } catch (error) {
      removeToken();
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthAndFetchUser();
  }, []);

  if (loading) return <p>Loading user data...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
      {userId && userData ? (
        <EditProfileForm userId={userId} initialData={userData} />
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
