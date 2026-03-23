import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../client/get-user';

export function useUserQuery() {
    return useQuery({
        queryKey: ['USER'],
        queryFn: getUser,
    });
}
