import { ComponentImportResource } from '@noodles-ui/core-types';

export const AccordionResource: ComponentImportResource = {
    type: 'component',
    module: '@kobalte/core',
    name: 'Accordion',
    alias: 'KobAccordion',
    docs: 'https://kobalte.dev/docs/core/components/accordion',
    expose: [
        {
            name: 'Accordion.Root',
        },
        {
            name: 'Accordion.Item',
        },
        {
            name: 'Accordion.Header',
        },
        {
            name: 'Accordion.Content',
        },
    ],
};
