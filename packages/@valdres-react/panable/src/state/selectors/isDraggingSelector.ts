import { selectorFamily } from "valdres"
import { activeActionsAtom } from "../atoms/activeActionsAtom"
import { type ScopeId } from "../../types/ScopeId"

export const isDraggingSelector = selectorFamily<ScopeId, boolean>(
    scopeId => get => {
        return get(activeActionsAtom(scopeId)).some(
            ([, kind]) => kind === "drag",
        )
    },
    { name: "@valdres-react/panable/isDraggingSelector" },
)
