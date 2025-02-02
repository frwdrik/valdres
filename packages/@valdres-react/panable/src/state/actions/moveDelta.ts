import { cameraPositionAtom, scaleAtom } from "@valdres-react/panable"
// import { currentCapabilitesSelector } from '../../../state/selectors/currentCapabilitesSelector'
import { updateDragActionsAfterMove } from "./updateDragActionsAfterMove"
import type { TransactionInterface } from "valdres-react"
import type { ScopeId } from "../../types/ScopeId"

export const moveDelta = (
    txn: TransactionInterface,
    x: number,
    y: number,
    scopeId: ScopeId,
) => {
    // const capabilities = recoil.get(currentCapabilitesSelector)
    // if (capabilities.actions.pan.enabled && capabilities.actions.pan.gestures) {
    const scale = txn.get(scaleAtom(scopeId))
    const deltaX = x / scale
    const deltaY = y / scale
    updateDragActionsAfterMove(txn, scopeId, deltaX, deltaY)
    txn.set(cameraPositionAtom(scopeId), curr => ({
        x: curr.x - deltaX,
        y: curr.y - deltaY,
        animate: false,
    }))
    // }
}
