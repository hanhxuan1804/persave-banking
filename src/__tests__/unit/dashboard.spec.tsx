import { act, render, screen } from '@testing-library/react';

import Dashboard from '@/app/(application)/dashboard/page';

describe('Dashboard', () => {
  it('Render component', () => {
    act(() => {
      render(<Dashboard />);
    });

    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});
