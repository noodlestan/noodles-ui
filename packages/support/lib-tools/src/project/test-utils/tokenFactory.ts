import { TokenEntity } from '@noodles-ui/core-types';

export function tokenFactory(overides?: Partial<TokenEntity>): TokenEntity {
    return {
        type: 'token',
        name: '',
        module: '',
        surface: true,
        pattern: '',
        vars: {},
        params: [],
        ...overides,
    };
}
