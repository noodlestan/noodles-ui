import { render } from '@solidjs/testing-library';
import { describe, expect, test } from 'vitest';

import { Text } from './Text';

const content = 'Lorem ipsum';

describe('<Text />', () => {
    test('renders', () => {
        const { container, unmount } = render(() => <Text>{content}</Text>);
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
});
