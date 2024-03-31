import { PropOwnResource } from '@noodles-ui/core-resources';

import { VariantEntity } from '../variant';

export type PropVariantEntity = PropOwnResource & { variant: VariantEntity };
export type PropVariantReference = PropOwnResource & { reference: VariantEntity };
export type PropGenericEntity = PropOwnResource;
export type PropEntity = PropVariantEntity | PropVariantReference | PropGenericEntity;
