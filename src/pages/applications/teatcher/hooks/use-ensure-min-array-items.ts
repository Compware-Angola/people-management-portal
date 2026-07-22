// src/hooks/use-ensure-min-array-items.ts
import { useEffect } from 'react'

interface ArrayFieldLike<T> {
    state: { value: T[] }
    pushValue: (value: T) => void
}

/**
 * Garante que um campo array do TanStack Form comece com no mínimo
 * `min` itens já renderizados na UI (por padrão 1).
 */
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
        // roda só na montagem
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}