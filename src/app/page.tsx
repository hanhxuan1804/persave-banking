import { redirect } from 'next/navigation';

import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/signin');

  redirect('/dashboard');
};

export default Home;
