import { CompilerContext } from '@noodles-ui/core-compiler';
import {
    UnknownResource,
    getResourceModule,
    getResourceName,
    getResourceType,
} from '@noodles-ui/core-resources';

export const shouldExpand = (
    compiler: CompilerContext,
    resource: string | UnknownResource,
): boolean => {
    const { expand } = compiler.interactive;

    if (expand.find(pattern => pattern === 'all')) {
        return true;
    }

    if (typeof resource === 'string') {
        return !!expand.find(pattern => resource.includes(pattern));
    }

    const type = getResourceType(resource);
    const name = getResourceName(resource);
    const module = getResourceModule(resource);

    const matchResource = (pattern: string): boolean => {
        if (pattern === type || pattern === type + 's') {
            return true;
        }
        if (pattern.startsWith('@') && module.includes(pattern.substring(1))) {
            return true;
        }
        if (name.includes(pattern)) {
            return true;
        }
        return false;
    };

    return !!expand.find(matchResource);
};
