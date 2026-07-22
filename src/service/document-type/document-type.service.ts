import { gaApi } from '@/lib/api/ga.api'
import type {
  DocumentTypeFilter,
  DocumentTypeResponse,
} from './document-type.type'

export async function getDocumentTypes(filter?: DocumentTypeFilter) {
  const params = new URLSearchParams()
  if (filter?.search) {
    params.append('search', filter.search)
  }
  if (filter?.page) {
    params.append('page', String(filter.page))
  }
  if (filter?.limit) {
    params.append('limit', String(filter.limit))
  }
  filter?.ids?.forEach((id) => {
    params.append('ids', String(id))
  })
  const response = await gaApi
    .get('document-type', {
      searchParams: params,
    })
    .json<DocumentTypeResponse>()
  return response.data
}
