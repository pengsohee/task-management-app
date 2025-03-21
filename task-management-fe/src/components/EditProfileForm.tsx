'use client';

import { useForm } from 'react-hook-form';
import { taskApi } from '@/services/api';

interface EditProfileFormProps {
  userId: string;
  initialData: {
    username: string;
    email: string;
  };
}

export default function EditProfileForm({ userId, initialData }: EditProfileFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<{
    username: string;
    email: string;
    currentPassword: string;
  }>({
    defaultValues: {
      username: initialData.username,
      email: initialData.email,
      currentPassword: '',
    },
  });

  const onSubmit = async (data: { username: string; email: string; currentPassword: string }) => {
    try {
      console.log('Sending PATCH request to /api/profile/' + userId, data);
      await taskApi.updateProfile(userId, data);

      console.log('Profile updated successfully');
    } catch (error) {
      // Handle error here
      console.error('Profile update failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          {...register('username', { required: 'Username is required' })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Current Password</label>
        <input
          type="password"
          {...register('currentPassword', { required: 'Current password is required' })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Update Profile
      </button>
    </form>
  );
}