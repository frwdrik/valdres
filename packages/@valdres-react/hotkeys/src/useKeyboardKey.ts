import { subscribeToKey, type KeyboardCode } from "@valdres/hotkeys"
import { useCallback, useEffect } from "react"
import { useStore } from "valdres-react"
import { parseHookRestArgs } from "./lib/parseHookRestArgs"
import type { HookRestArgs } from "./types/HookRestArgs"

export const useKeyboardKey = (
    code: KeyboardCode | KeyboardCode[],
    callback: () => {},
    ...args: HookRestArgs
) => {
    const [opts, deps] = parseHookRestArgs(args)
    const memoizedCallback = useCallback(callback, deps)
    const store = useStore()

    useEffect(
        () => subscribeToKey(code, memoizedCallback, opts, store),
        [memoizedCallback, store, ...code, ...deps],
    )
}
