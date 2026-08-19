import { useState } from 'react'
import { FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getDocumentTypeLabel } from './document-type-labels'
import type { MyApplication } from '@/service/applications/applications.type'
import { useRegisterDocument } from '@/hooks/application'
import { DownloadFileButton } from '@/components/download/download-button'
import { useUploadSingle, useDeleteFile } from '@/hooks/upload/use-download'
import { CANDIDATE_DOCUMENTS_FOLDER } from '@/constants/folder'

interface DocumentsTabProps {
  application: MyApplication
}
interface DocumentRowProps {
  candidateId: number
  documentTypeId: number
  fileName?: string
  updatedAt?: string
  label?: string
  readOnly?: boolean
}

// Limite de tamanho de ficheiro
const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png']

function DocumentRow({
  candidateId,
  documentTypeId,
  fileName,
  updatedAt,
  label,
  readOnly = false,
}: DocumentRowProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const registerMutation = useRegisterDocument()
  const uploadSingle = useUploadSingle()
  const deleteFile = useDeleteFile()

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setError(null)

    if (!file) return

    // Validação de extensão
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setError('Formato inválido. Use PDF, JPG ou PNG.')
      setSelectedFile(null)
      e.target.value = '' // limpa o input para permitir re-seleção do mesmo ficheiro
      return
    }

    // Validação de tamanho
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`Ficheiro muito grande. O limite é ${MAX_FILE_SIZE_MB}MB.`)
      setSelectedFile(null)
      e.target.value = ''
      return
    }

    setSelectedFile(file)
  }

  async function handleUpload() {
    let key: string | null = null
    try {
      if (!selectedFile) return
      setIsUploading(true)
      setError(null)
      const response = await uploadSingle.mutateAsync({
        file: selectedFile,
        options: { folder: CANDIDATE_DOCUMENTS_FOLDER },
      })
      key = response.key
      await registerMutation.mutateAsync({ candidateId, documentTypeId, key })
    } catch (err) {
      if (key) {
        await deleteFile.mutateAsync(key)
      }
      setError('Falha ao enviar o ficheiro. Tente novamente.')
    } finally {
      setIsUploading(false)
      setSelectedFile(null)
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">
            {label ?? getDocumentTypeLabel(documentTypeId)}
          </p>
          {fileName ? (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              {fileName}
              {updatedAt &&
                ` · atualizado em ${new Date(updatedAt).toLocaleDateString('pt-PT')}`}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Nenhum ficheiro enviado
            </p>
          )}
          {error && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!readOnly && (
          <>
            <input
              id={`file-${documentTypeId}`}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor={`file-${documentTypeId}`}
              className="cursor-pointer rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
            >
              {selectedFile ? selectedFile.name : "Escolher ficheiro"}
            </label>
            <Button
              type="button"
              size="sm"
              disabled={!selectedFile || isUploading}
              onClick={handleUpload}
            >
              <Upload className="mr-1 h-3.5 w-3.5" />
              {isUploading ? "A enviar..." : "Enviar"}
            </Button>
          </>
        )}
        {fileName && <DownloadFileButton path={fileName} />}
      </div>
    </div>
  )
}

const REQUIRED_DOCUMENT_TYPES = [1, 13, 2, 12]

export function DocumentsTab({ application }: DocumentsTabProps) {
  // Um candidato pode ter mais de um documento do mesmo tipo (ex.: vários
  // diplomas/certificados) — agrupa por tipo em vez de colapsar num único
  // documento por tipo, para não perder nenhum na renderização.
  const documentsByType = new Map<number, MyApplication['documents']>()
  for (const doc of application.documents) {
    const list = documentsByType.get(doc.documentTypeId) ?? []
    list.push(doc)
    documentsByType.set(doc.documentTypeId, list)
  }

  return (
    <div className="flex flex-col gap-4">
      {REQUIRED_DOCUMENT_TYPES.map((typeId) => {
        const [primary, ...extra] = documentsByType.get(typeId) ?? []
        return (
          <div key={typeId} className="flex flex-col gap-2">
            <DocumentRow
              candidateId={application.id}
              documentTypeId={typeId}
              fileName={primary?.fileName}
              updatedAt={primary?.updatedAt}
            />
            {extra.map((doc, index) => (
              <DocumentRow
                key={doc.id}
                candidateId={application.id}
                documentTypeId={typeId}
                fileName={doc.fileName}
                updatedAt={doc.updatedAt}
                label={`${getDocumentTypeLabel(typeId)} (adicional ${index + 2})`}
                readOnly
              />
            ))}
          </div>
        )
      })}
      {[...documentsByType.entries()]
        .filter(([typeId]) => !REQUIRED_DOCUMENT_TYPES.includes(typeId))
        .flatMap(([, docs]) => docs)
        .map((doc) => (
          <DocumentRow
            key={doc.id}
            candidateId={application.id}
            documentTypeId={doc.documentTypeId}
            fileName={doc.fileName}
            updatedAt={doc.updatedAt}
          />
        ))}
    </div>
  )
}