import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  //in v5 isPending
  const { isLoading: isDeleting, mutate: deleteBooking } =
    useMutation({
      mutationFn: (id) => deleteBookingAPI(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['bookings'],
        });
        toast.success('Booking successfully deleted');
      },
      onError: (err) => toast.error(err.message),
    });

  return { isDeleting, deleteBooking };
}
