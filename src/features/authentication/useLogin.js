import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginAPI({ email, password });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user); //manually save data to cache
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
