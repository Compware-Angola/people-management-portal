import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  File as FileIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Upload,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFieldContext } from '..'
import { useUploadSingle, useDeleteFile } from '@/hooks/upload/use-download'
import { CANDIDATE_DOCUMENTS_FOLDER } from '@/constants/folder'

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true

  const patterns = accept
    .split(',')
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean)

  if (patterns.length === 0) return true

  const fileName = file.name.toLowerCase()
  const fileType = file.type.toLowerCase()

  return patterns.some((pattern) => {
    if (pattern.startsWith('.')) {
      return fileName.endsWith(pattern)
    }
    if (pattern.endsWith('/*')) {
      return fileType.startsWith(pattern.replace('/*', '/'))
    }
    return fileType === pattern
  })
}

function keyToFileName(key: string) {
  return key.split('/').pop() ?? key
}

type PendingEntry = {
  id: string
  name: string
  size: number
  status: 'uploading' | 'error'
  error?: string
}

export function UploadFileField({
  label,
  accept,
  multiple = false,
  description,
  maxSizeMB,
}: {
  label: string
  accept?: string
  multiple?: boolean
  description?: string
  maxSizeMB?: number
}) {
  const field = useFieldContext<string | string[] | undefined>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [pending, setPending] = useState<PendingEntry[]>([])

  const uploadSingle = useUploadSingle()
  const deleteFile = useDeleteFile()

  const errors = field.state.meta.errors
  const hasFieldError = errors.length > 0
  const hasError = hasFieldError || !!localError

  const maxSizeBytes = maxSizeMB ? maxSizeMB * 1024 * 1024 : undefined

  // As keys já enviadas vêm sempre diretamente do valor do campo (fonte
  // única da verdade), nunca de uma cópia local — assim, se o submit final
  // falhar e o wizard limpar este campo (porque os ficheiros já enviados
  // foram apagados do storage para não ficarem órfãos), a lista aqui
  // reflete isso na mesma renderização e obriga a um novo upload, em vez de
  // continuar a mostrar como "enviada" uma key que já não existe no storage.
  const value = field.state.value
  const doneKeys: string[] = multiple
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === 'string' && value
      ? [value]
      : []

  async function uploadFile(file: File, id: string) {
    try {
      const response = await uploadSingle.mutateAsync({
        file,
        options: { folder: CANDIDATE_DOCUMENTS_FOLDER },
      })
      setPending((prev) => prev.filter((e) => e.id !== id))
      field.handleChange((prev) => {
        if (multiple) {
          const prevArr = Array.isArray(prev) ? prev : []
          return [...prevArr, response.key]
        }
        return response.key
      })
      field.handleBlur()
    } catch {
      setPending((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, status: 'error' as const, error: 'Falha ao enviar' }
            : e,
        ),
      )
    }
  }

  function addFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList)
    if (incoming.length === 0) return

    const valid: File[] = []
    let rejectionReason: string | null = null

    for (const file of incoming) {
      if (!matchesAccept(file, accept)) {
        rejectionReason = `Tipo de ficheiro não suportado: ${file.name}`
        continue
      }
      if (maxSizeBytes && file.size > maxSizeBytes) {
        rejectionReason = `${file.name} excede o tamanho máximo de ${maxSizeMB} MB`
        continue
      }
      valid.push(file)
    }

    setLocalError(rejectionReason)
    if (valid.length === 0) return

    if (!multiple && doneKeys[0]) {
      deleteFile.mutate(doneKeys[0])
      field.handleChange('')
    }

    const newPending: PendingEntry[] = valid.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      status: 'uploading',
    }))

    setPending((prev) => (multiple ? [...prev, ...newPending] : newPending))

    newPending.forEach((entry, index) => uploadFile(valid[index], entry.id))
  }

  function removeDoneKey(key: string) {
    deleteFile.mutate(key)
    field.handleChange((prev) => {
      if (multiple) {
        const prevArr = Array.isArray(prev) ? prev : []
        return prevArr.filter((k) => k !== key)
      }
      return ''
    })
    field.handleBlur()
  }

  function removePending(id: string) {
    setPending((prev) => prev.filter((e) => e.id !== id))
  }

  const hasItems = doneKeys.length > 0 || pending.length > 0

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {description && (
        <p className="-mt-1 text-sm text-muted-foreground">{description}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files)
          e.target.value = ''
        }}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors cursor-pointer',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40',
          hasError && 'border-destructive/60',
        )}
      >
        <Upload className="h-5 w-5 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Clique</span> para
          escolher ou arraste o ficheiro aqui
        </p>
        {(accept || maxSizeMB) && (
          <p className="text-xs text-muted-foreground/70">
            {accept}
            {accept && maxSizeMB ? ' · ' : ''}
            {maxSizeMB ? `até ${maxSizeMB} MB` : ''}
          </p>
        )}
      </div>

      {hasItems && (
        <ul className="space-y-1.5">
          {doneKeys.map((key) => (
            <li
              key={key}
              className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-1.5"
            >
              <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium leading-tight">
                  {keyToFileName(key)}
                </p>
                <p className="flex items-center gap-1 text-xs leading-tight text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Enviado
                </p>
              </div>

              <Button
                type="button"
                onClick={() => removeDoneKey(key)}
                aria-label={`Remover ${keyToFileName(key)}`}
                size="icon-sm"
                variant="default"
              >
                <X className="h-full w-full" />
              </Button>
            </li>
          ))}

          {pending.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-1.5"
            >
              <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium leading-tight">
                  {entry.name}
                </p>
                <p className="flex items-center gap-1 text-xs leading-tight text-muted-foreground">
                  {entry.status === 'uploading' && (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" /> A enviar...
                      ({formatBytes(entry.size)})
                    </>
                  )}
                  {entry.status === 'error' && (
                    <>
                      <AlertCircle className="h-3 w-3 text-destructive" />{' '}
                      {entry.error}
                    </>
                  )}
                </p>
              </div>

              <Button
                type="button"
                onClick={() => removePending(entry.id)}
                aria-label={`Remover ${entry.name}`}
                size="icon-sm"
                variant="default"
                disabled={entry.status === 'uploading'}
              >
                <X className="h-full w-full" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {localError && (
        <p className="text-xs text-destructive">{localError}</p>
      )}

      {!localError && hasFieldError && (
        <p className="text-xs text-destructive">
          {errors.map((e: any) => e.message ?? e).join(', ')}
        </p>
      )}
    </div>
  )
}
