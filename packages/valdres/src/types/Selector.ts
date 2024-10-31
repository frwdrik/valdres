import type { GetValue } from "./GetValue"
import type { SelectorFamily } from "./SelectorFamily"

export type Selector<Value = unknown, FamilyKey = undefined> = {
    get: (get: GetValue, storeId: string) => Value
    label?: string
    family?: SelectorFamily<FamilyKey, Value>
    familyKey?: FamilyKey
    onMount?: () => void | (() => void)
}
