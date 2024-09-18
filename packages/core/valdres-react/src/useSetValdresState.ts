import type { State } from "valdres"
import { useValdresStore } from "./useValdresStore"

export const useSetValdresState = <V>(state: State<V>) => {
    const store = useValdresStore()
    return (value: V) => store.set(state, value)
}
