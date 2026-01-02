import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins';

export function useDeleteCabin(id) {
  const queryClient = useQueryClient();

  //in v5 isPending
  const { isLoading: isDeleting, mutate: deleteCabin } =
    useMutation({
      mutationFn: (id) => deleteCabinAPI(id),
      onSuccess: () => {
        //fetch cabins data again
        queryClient.invalidateQueries({
          queryKey: ['cabins'],
        });
        toast.success('Cabin successfully deleted');
      },
      onError: (err) => toast.error(err.message),
    });

  return { isDeleting, deleteCabin };
}
