import { useEffect } from 'react'

interface ArrayFieldLike<T> {
    state: { value: T[] }
    pushValue: (value: T) => void
}


export function useEnsureMinArrayItems<T>(
    field: ArrayFieldLike<T>,
    defaultItem: T,
    min = 1,
) {
    useEffect(() => {
        const missing = min - field.state.value.length
        for (let i = 0; i < missing; i++) {
            field.pushValue(defaultItem)
        }
    }, [])
}