
import { useQuery } from '@tanstack/react-query';
import { getBanks } from '../../client/get-banks';



export function useBanksQuery() {
  return useQuery({
    queryKey: ['BANKS'],
    queryFn: () => getBanks(),
  });
}
