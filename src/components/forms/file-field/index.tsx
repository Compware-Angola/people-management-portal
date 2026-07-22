import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { File as FileIcon, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFieldContext } from '..'

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

type FileFieldSize = 'sm' | 'md' | 'lg'

const sizeStyles: Record<
  FileFieldSize,
  {
    gap: string
    dropzone: string
    dropIcon: string
    dropText: string
    listGap: string
    item: string
    itemIcon: string
    itemName: string
    itemMeta: string
    itemRemove: string
    description: string
    error: string
  }
> = {
  sm: {
    gap: 'space-y-1.5',
    dropzone: 'px-3 py-2.5 gap-2',
    dropIcon: 'h-4 w-4',
    dropText: 'text-xs',
    listGap: 'space-y-1',
    item: 'px-2 py-1 gap-2',
    itemIcon: 'h-3.5 w-3.5',
    itemName: 'text-xs',
    itemMeta: 'text-[11px]',
    itemRemove: 'h-3.5 w-3.5 p-0.5',
    description: 'text-xs',
    error: 'text-xs',
  },
  md: {
    gap: 'space-y-2',
    dropzone: 'px-4 py-4 gap-2',
    dropIcon: 'h-5 w-5',
    dropText: 'text-sm',
    listGap: 'space-y-1.5',
    item: 'px-3 py-1.5 gap-3',
    itemIcon: 'h-4 w-4',
    itemName: 'text-sm',
    itemMeta: 'text-xs',
    itemRemove: 'h-4 w-4 p-1',
    description: 'text-sm',
    error: 'text-sm',
  },
  lg: {
    gap: 'space-y-2',
    dropzone: 'px-4 py-6 gap-2',
    dropIcon: 'h-5 w-5',
    dropText: 'text-sm',
    listGap: 'space-y-2',
    item: 'px-3 py-2 gap-3',
    itemIcon: 'h-4 w-4',
    itemName: 'text-sm',
    itemMeta: 'text-xs',
    itemRemove: 'h-4 w-4 p-1',
    description: 'text-sm',
    error: 'text-sm',
  },
}

export function FileField({
  label,
  accept,
  multiple = false,
  description,
  size = 'lg',
  maxSizeMB,
}: {
  label: string
  accept?: string
  multiple?: boolean
  description?: string
  size?: FileFieldSize
  maxSizeMB?: number
}) {
  const field = useFieldContext<File | File[] | undefined>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const s = sizeStyles[size]

  const errors = field.state.meta.errors
  const hasFieldError = errors.length > 0
  const hasError = hasFieldError || !!localError
  const value = field.state.value

  const maxSizeBytes = maxSizeMB ? maxSizeMB * 1024 * 1024 : undefined

  const files: File[] = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value instanceof File
      ? [value]
      : []

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

    if (multiple) {
      field.handleChange([...files, ...valid])
    } else {
      field.handleChange(valid[0])
    }
    field.handleBlur()
  }

  function removeFile(index: number) {
    setLocalError(null)
    if (multiple) {
      field.handleChange(files.filter((_, i) => i !== index))
    } else {
      field.handleChange(undefined)
    }
  }

  return (
    <div className={s.gap}>
      <Label>{label}</Label>

      {description && (
        <p className={cn(s.description, 'text-muted-foreground -mt-1')}>
          {description}
        </p>
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
          'flex items-center justify-center rounded-lg border-2 border-dashed text-center transition-colors cursor-pointer',
          size === 'lg' ? 'flex-col' : 'flex-row',
          s.dropzone,
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40',
          hasError && 'border-destructive/60',
        )}
      >
        <Upload className={cn(s.dropIcon, 'shrink-0 text-muted-foreground')} />
        <p className={cn(s.dropText, 'text-muted-foreground')}>
          <span className="font-medium text-foreground">Clique</span>{' '}
          {size === 'lg'
            ? 'para escolher ou arraste o ficheiro aqui'
            : 'ou arraste'}
          {accept && size !== 'lg' ? ` (${accept})` : ''}
        </p>
        {size === 'lg' && (accept || maxSizeMB) && (
          <p className="text-xs text-muted-foreground/70">
            {accept}
            {accept && maxSizeMB ? ' · ' : ''}
            {maxSizeMB ? `até ${maxSizeMB} MB` : ''}
          </p>
        )}
      </div>

      {files.length > 0 && (
        <ul className={s.listGap}>
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className={cn(
                'flex items-center rounded-md border bg-muted/30',
                s.item,
              )}
            >
              <FileIcon
                className={cn(s.itemIcon, 'shrink-0 text-muted-foreground')}
              />

              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    s.itemName,
                    'truncate font-medium leading-tight',
                  )}
                >
                  {file.name}
                </p>
                <p
                  className={cn(
                    s.itemMeta,
                    'text-muted-foreground leading-tight',
                  )}
                >
                  {formatBytes(file.size)}
                </p>
              </div>

              <Button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remover ${file.name}`}
                size="icon-sm"
                variant="default"
              >
                <X className="h-full w-full" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {localError && (
        <p className={cn(s.error, 'text-destructive')}>{localError}</p>
      )}

      {!localError && hasFieldError && (
        <p className={cn(s.error, 'text-destructive')}>
          {errors.map((e: any) => e.message ?? e).join(', ')}
        </p>
      )}
    </div>
  )
}