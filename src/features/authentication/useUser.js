import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth.js';

export const useUser = () => {
  const {
    isLoading,
    data: user,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === 'authenticated';

  return {
    isLoading,
    user,
    error,
    isAuthenticated,
    isFetching,
  };
};
