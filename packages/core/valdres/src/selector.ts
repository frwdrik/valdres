import type { GetValue } from "./types/GetValue"
import type { Selector } from "./types/Selector"

export const selector = <Value, FamilyKey = undefined>(
    get: (get: GetValue, storeId: string) => Value,
    debugLabel?: string,
): Selector<Value, FamilyKey> => ({
    get,
    debugLabel,
})
