import { GraphQLClient } from "graphql-request";
import { cache } from "react";

const endpoint = process.env.ANILIST_GRAPHQL as string;

export const anilist_client = new GraphQLClient(endpoint, {
      errorPolicy: "all",
      fetch: cache(
            async (
                  url: string | URL | Request,
                  params: RequestInit | undefined,
            ) => {
                  const nextConfig = (params?.headers as any)
                        ?.next as NextFetchRequestConfig;
                  delete (params?.headers as any)?.next;
                  return fetch(url, {
                        ...params,
                        next: { revalidate: 10, ...nextConfig },
                  });
            },
      ),
});
