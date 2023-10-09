import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useSearchParams } from "next/navigation";

function useQueryParams<T>(router: AppRouterInstance, pathname: string) {
  const searchParams = useSearchParams();

  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  const setQueryParams = (params: Partial<T>) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, String(value));
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };

  return { queryParams: searchParams, setQueryParams };
}

export default useQueryParams;
