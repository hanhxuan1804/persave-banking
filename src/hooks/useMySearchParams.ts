import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useMySearchParams = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const createQueryStringMultiple = useCallback(
    (keyValuePairs: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(keyValuePairs).forEach(([key, value]) => {
        params.set(key, value);
      });

      return params.toString();
    },
    [searchParams]
  );

  const get = (key: string) => {
    return searchParams.get(key);
  };

  const set = (key: string, value: string) => {
    router.push(pathName + '?' + createQueryString(key, value), {
      scroll: false,
    });
  };
  const setMultiple = (keyValuePairs: Record<string, string>) => {
    router.push(pathName + '?' + createQueryStringMultiple(keyValuePairs), {
      scroll: false,
    });
  };
  return { get, set, setMultiple };
};
