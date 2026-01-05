import { User } from '@/types/user';
export const mockUser: User[] = [
  {
    id: 'u1',
    username: 'kedycat',
    email: 'kat@example.com',
    monthlyCircleDate: '2024-01-01',
    hashedPassword: '$2b$12$fakeBcryptHashForNow', // (Use strong hash in backend, never send to client)
  },
];
