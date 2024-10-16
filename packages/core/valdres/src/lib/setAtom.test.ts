import { describe, test, expect, mock } from "bun:test"
import { store } from "../store"
import { atom } from "../atom"
import { setAtom } from "./setAtom"
import { selector } from "../selector"

describe("setAtom", () => {
    test("set with direct value", () => {
        const store1 = store()
        const numberAtom = atom(1)
        expect(store1.data.values.get(numberAtom)).toBeUndefined()
        setAtom(numberAtom, 2, store1.data)
        expect(store1.data.values.get(numberAtom)).toBe(2)
    })

    test("set with callback", () => {
        const store1 = store()
        const numberAtom = atom(1)
        expect(store1.data.values.get(numberAtom)).toBeUndefined()
        setAtom(numberAtom, current => current + 1, store1.data)
        expect(store1.data.values.get(numberAtom)).toBe(2)
    })

    test("set with same value does not trigger selectors and subscribers to re-evalute", () => {
        const store1 = store()
        const numberAtom = atom(1)
        const selectorCallback = mock(get => get(numberAtom) + 1)
        const multiplySelector = selector(selectorCallback)
        expect(store1.get(multiplySelector)).toBe(2)
        expect(selectorCallback).toHaveBeenCalledTimes(1)
        store1.set(numberAtom, 1)
        expect(store1.get(multiplySelector)).toBe(2)
        expect(selectorCallback).toHaveBeenCalledTimes(1)
    })
})
