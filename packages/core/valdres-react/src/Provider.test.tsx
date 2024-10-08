import { describe, test, expect } from "bun:test"
import { renderHook } from "@testing-library/react-hooks"
import { createStore } from "valdres"
import { useStoreId } from "./useStoreId"
import { Provider } from "./Provider"
import { useStore } from "./useStore"

const StoreId = () => {
    const id = useStoreId()
    return <div>{id}</div>
}

describe("Provider", () => {
    test("set with direct value", () => {
        const store = createStore("Foo")

        const { result } = renderHook(() => useStoreId(), {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            ),
        })
        expect(result.current).toBe("Foo")
    })

    test("nested providers can access parent stores by id", () => {
        const storeA = createStore("A")
        const storeB = createStore("B")
        const storeC = createStore("C")

        const { result, rerender } = renderHook(
            (storeId?: string) => useStore(storeId),
            {
                wrapper: ({ children }) => (
                    <Provider store={storeA}>
                        <StoreId />
                        <Provider store={storeB}>
                            <StoreId />
                            <Provider store={storeC}>
                                <StoreId />
                                {children}
                            </Provider>
                        </Provider>
                    </Provider>
                ),
            },
        )
        expect(result.current.data.id).toBe("C")
        rerender("A")
        expect(result.current.data.id).toBe("A")
        rerender("B")
        expect(result.current.data.id).toBe("B")
        rerender("C")
        expect(result.current.data.id).toBe("C")
    })
})
