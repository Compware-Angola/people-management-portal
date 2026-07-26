import { QUERY_KEY } from '@/constants/query-key'
import { getDocumentTypes } from '@/service/document-type'
import type { DocumentTypeFilter } from '@/service/document-type'
import { queryOptions, useQuery } from '@tanstack/react-query'

export function documentTypesQueryOptions(filter: DocumentTypeFilter) {
  return queryOptions({
    queryKey: [QUERY_KEY.documentTypes, 'list', filter],
    queryFn: () => getDocumentTypes(filter),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
export function useDocumentTypesQuery(filter: DocumentTypeFilter) {
  return useQuery(documentTypesQueryOptions(filter))
}
