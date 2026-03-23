import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../client/get-profile';

export function useProfileQuery() {
    return useQuery({
        queryKey: ['PROFILE'],
        queryFn: getProfile,
    });
}
