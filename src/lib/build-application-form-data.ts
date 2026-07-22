function extractFiles(
    data: unknown,
    files: { fieldname: string; file: File }[] = [],
    parentKey = '',
): { plain: unknown; files: { fieldname: string; file: File }[] } {
    if (data instanceof File) {
        files.push({ fieldname: parentKey, file: data })
        return { plain: undefined, files }
    }

    if (Array.isArray(data)) {
        const plainArray: unknown[] = []
        data.forEach((item, index) => {
            const key = parentKey
            if (item instanceof File) {
                files.push({ fieldname: key, file: item })
            } else {
                const result = extractFiles(item, files, `${parentKey}.${index}`)
                plainArray.push(result.plain)
            }
        })
        return { plain: plainArray, files }
    }

    if (data !== null && typeof data === 'object') {
        const plainObj: Record<string, unknown> = {}
        Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
            const nestedKey = parentKey ? `${parentKey}.${key}` : key
            const result = extractFiles(value, files, nestedKey)
            plainObj[key] = result.plain
        })
        return { plain: plainObj, files }
    }

    return { plain: data, files }
}

export function buildApplicationFormData(value: Record<string, unknown>) {
    const { plain, files } = extractFiles(value)

    const formData = new FormData()
    formData.append('data', JSON.stringify(plain))

    files.forEach(({ fieldname, file }) => {
        formData.append(fieldname, file)
    })

    return formData
}