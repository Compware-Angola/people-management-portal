import { useState } from 'react'
import { FileText, Upload, Download, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getDocumentTypeLabel } from './document-type-labels'
import type { MyApplication } from '@/service/applications/applications.type'
import { useUploadDocument } from '@/hooks/application'

interface DocumentsTabProps {
  application: MyApplication
}

interface DocumentRowProps {
  candidateId: number
  documentTypeId: number
  fileName?: string
  updatedAt?: string
}

function DocumentRow({
  candidateId,
  documentTypeId,
  fileName,
  updatedAt,
}: DocumentRowProps) {
  const uploadMutation = useUploadDocument(candidateId)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  function handleUpload() {
    if (!selectedFile) return
    uploadMutation.mutate(
      { documentTypeId, file: selectedFile },
      { onSuccess: () => setSelectedFile(null) },
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">
            {getDocumentTypeLabel(documentTypeId)}
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
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id={`file-${documentTypeId}`}
          type="file"
          accept=".pdf,.jpg,.png"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor={`file-${documentTypeId}`}
          className="cursor-pointer rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
        >
          {selectedFile ? selectedFile.name : 'Escolher ficheiro'}
        </label>

        <Button
          type="button"
          size="sm"
          disabled={!selectedFile || uploadMutation.isPending}
          onClick={handleUpload}
        >
          <Upload className="mr-1 h-3.5 w-3.5" />
          {uploadMutation.isPending ? 'A enviar...' : 'Enviar'}
        </Button>
      </div>
    </div>
  )
}


const REQUIRED_DOCUMENT_TYPES = [1, 13, 2, 12]

export function DocumentsTab({ application }: DocumentsTabProps) {
  const documentsByType = new Map(
    application.documents.map((doc) => [doc.documentTypeId, doc]),
  )

  return (
    <div className="flex flex-col gap-4">
      {REQUIRED_DOCUMENT_TYPES.map((typeId) => {
        const doc = documentsByType.get(typeId)
        return (
          <DocumentRow
            key={typeId}
            candidateId={application.id}
            documentTypeId={typeId}
            fileName={doc?.fileName}
            updatedAt={doc?.updatedAt}
          />
        )
      })}

      {application.documents
        .filter((doc) => !REQUIRED_DOCUMENT_TYPES.includes(doc.documentTypeId))
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