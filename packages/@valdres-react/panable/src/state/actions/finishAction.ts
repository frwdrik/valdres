import { draggableItemAtom } from "@valdres-react/draggable"
import { actionAtom } from "../atoms/actionAtom"
import type { ScopeId } from "../../types/ScopeId"
import type { TransactionInterface } from "valdres-react"
import { activeActionsAtom } from "../atoms/activeActionsAtom"

export const finishAction = (
    txn: TransactionInterface,
    scopeId: ScopeId,
    eventId: string | number,
    e?: any,
    onCanvasClick?: any,
) => {
    const action = txn.get(actionAtom({ eventId, scopeId }))
    if (action) {
        if (action.kind === "drag") {
            const item = txn.get(draggableItemAtom(action.id))
            if (item.isSnapping) {
                action?.onDrop(eventId)
            }
            txn.reset(draggableItemAtom(action.id))
            if (action?.onDragEnd) {
                action?.onDragEnd(eventId)
            }
        }

        if (
            action.kind === "select" &&
            onCanvasClick &&
            !txn.get(isModifierKeyActiveAtom("shift"))
        ) {
            const diffX = Math.abs(action.initialEvent.clientX - e.clientX)
            const diffY = Math.abs(action.initialEvent.clientY - e.clientY)
            if (diffX < 3 && diffY < 3) {
                onCanvasClick(txn, e)
            }
        }

        if (
            action.kind === "move" &&
            action.initialized === false &&
            onCanvasClick &&
            !txn.get(isModifierKeyActiveAtom("shift"))
        ) {
            onCanvasClick(txn, e)
        }

        txn.set(activeActionsAtom(scopeId), curr =>
            curr.filter(([id]) => id !== eventId),
        )
        txn.reset(actionAtom({ eventId, scopeId }))
    }
}
