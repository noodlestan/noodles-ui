import { createContext } from 'solid-js';

import { SystemUIContextState } from '../types';

export const SystemUIContext = createContext<SystemUIContextState>({} as SystemUIContextState);
