import { signOut } from 'next-auth/react';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    // Sign out of session, redirect to login page.
    await signOut({ callbackUrl: '/auth/signin' });
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
