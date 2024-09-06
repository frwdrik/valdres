import type { State } from "../types/State"
import type { StoreData } from "../types/StoreData"

export const updateStateSubscribers = (state: State, data: StoreData) => {
    const subscribtions = data.subscriptions.get(state)
    if (subscribtions?.size) {
        for (const subscribtion of subscribtions) {
            subscribtion.callback()
        }
    }
    if (state.family) {
        const familySubscriptions = data.subscriptions.get(state.family)
        if (familySubscriptions?.size) {
            for (const subscribtion of familySubscriptions) {
                subscribtion.callback(state.familyKey)
            }
        }
    }
}
