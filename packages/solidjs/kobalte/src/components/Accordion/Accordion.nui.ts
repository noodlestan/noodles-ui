import { ComponentImportResource } from '@noodles-ui/core-resources';

export const AccordionResource: ComponentImportResource = {
    type: 'component',
    name: 'Accordion',
    module: '@kobalte/core',
    docs: 'https://kobalte.dev/docs/core/components/accordion',
    parts: [
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
