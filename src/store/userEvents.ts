import type { KeyboardRegisteredEvent } from "$lib/types"
import { persistentAtom } from "@nanostores/persistent"

const userEvents = persistentAtom<KeyboardRegisteredEvent[]>('keyboard', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export default userEvents
