import type { KeyboardRegisteredEvent } from "$lib/types"
import { atom } from "nanostores"

export const userEvents = atom<KeyboardRegisteredEvent[]>([])
