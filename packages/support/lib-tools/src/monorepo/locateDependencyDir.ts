import { dirname } from 'path';

import { sync as resolveSync } from 'resolve';

// this function is used to locate "@noodles-ui/live-*" packages
//   such as "@noodles-ui/live-app" (for serving)
//        or "@noodles-ui/live-solidjs" (for deploying)
//
// TODO Dodgy AF
//   without a real "main" module, resolveSync() won't work
//   in the packages we are locating we added a shim
//     "main": "src/index.ts"
//   but we are NOT interested in the "main" of the package
export const locateDependencyDir = (moduleName: string): string => {
    const mainModule = resolveSync(moduleName);
    return dirname(dirname(mainModule));
};
