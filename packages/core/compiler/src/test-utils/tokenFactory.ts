import { TokenEntity } from '@noodles-ui/core-entities';

export function tokenFactory(overides?: Partial<TokenEntity>): TokenEntity {
    return {
        type: 'token',
        name: '',
        module: '',
        surface: true,
        pattern: '',
        vars: {},
        ...overides,
    };
}
