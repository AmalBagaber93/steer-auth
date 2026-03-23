
import { useQuery } from '@tanstack/react-query';
import { getCountries } from '../../client/get-countries';



export function useCountriesQuery() {
  return useQuery({
    queryKey: ['Countries'],
    queryFn: () => getCountries(),
  });
}
