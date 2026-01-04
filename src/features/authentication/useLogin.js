import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Instead of using queryClient.setQueriesData(["user"], user);  we have to use
// queryClient.setQueryData(["user"], user.user); , since according to the docs setQueriesData is being used for updating existing cache data, not creating new ones:

// https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientsetqueriesdata

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginAPI({ email, password });
    },
    onSuccess: (data) => {
      queryClient.setQueriesData(['user'], data.user); //manually save data to cache
      toast.success('Login successful');

      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('AUTH ERR: ', err);
      toast.error(
        'Provided email or password are incorrect'
      );
      toast.error(`${err.message}: ${err.cause.message}`);
    },
  });

  return { login, isLoading };
}
