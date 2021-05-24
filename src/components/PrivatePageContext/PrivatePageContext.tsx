import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from 'contexts/authContext';

const PrivatePageContext: FC = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
      toast.error('You are not authorized to access this page');
    }
  }, [user]);

  return user ? <>{children}</> : <></>;
};

export default PrivatePageContext;
