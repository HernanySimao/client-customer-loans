export const useIFetch = (request: string, opts?: object) => {

    return useFetch(request, {
      baseURL: `http://localhost:3000`,
      ...opts
    })
  }
  