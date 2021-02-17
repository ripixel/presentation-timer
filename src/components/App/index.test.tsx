/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/display-name */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import App from '.';

describe('Components > App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders as expected', () => {
    const result = render(<App />);

    expect(result.getByText('Presentation Timer')).toBeInTheDocument();
  });
});
