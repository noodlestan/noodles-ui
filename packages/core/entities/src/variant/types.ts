import { VariantOwnResource, VariantVars } from '@noodles-ui/core-resources';

export type VariantEntity = Omit<VariantOwnResource, 'options' | 'vars'> & {
    options: string[];
    vars: VariantVars;
};

export type VariantReference = { reference: VariantEntity };
