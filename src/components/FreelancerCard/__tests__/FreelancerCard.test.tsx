import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FreelancerCard from '../FreelancerCard';
import { User } from '../../../types/User';

const mockUser: User = {
  id: 1,
  name: 'Melike Buyruk',
  username: 'mbuyruk',
  email: 'melikke.buyruk@gmail.com',
  phone: '123-456-7890',
  website: 'melike.com',
  photo: 'https://via.placeholder.com/150',
  jobCount: 10,
  address: {
    street: 'Main St',
    suite: 'Apt. 101',
    city: 'New York',
    zipcode: '10001',
  },
  company: {
    name: 'Odine',
    catchPhrase: 'We hire talents!',
    bs: 'tech solutions',
  },
};

const mockOnSave = jest.fn();

describe('FreelancerCard Component', () => {
  beforeEach(() => {
    render(
      <FreelancerCard
        User={mockUser}
        onSave={mockOnSave}
        isSaved={false}
        photo={mockUser.photo}
      />
    );
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <FreelancerCard
        User={mockUser}
        onSave={mockOnSave}
        isSaved={false}
        photo="https://via.placeholder.com/345x194"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should expand and collapse when the expand button is clicked', async () => {
    expect(screen.queryByText(/Email: melikke.buyruk@gmail.com/i)).not.toBeInTheDocument();
    const expandButton = screen.getByLabelText(/show more/i);
    fireEvent.click(expandButton);
    expect(screen.getByText(/Email: melikke.buyruk@gmail.com/i)).toBeInTheDocument();
    fireEvent.click(expandButton);
    await waitFor(() => {
      expect(screen.queryByText(/Email: melikke.buyruk@gmail.com/i)).not.toBeInTheDocument();
    });
  });

  it('should render TurnedInIcon when isSaved is true', () => {
  render(
    <FreelancerCard
      User={mockUser}
      onSave={mockOnSave}
      isSaved={true}
      photo={mockUser.photo}
    />
  );
  const saveButton = screen.getByTestId('save-button-saved');
  expect(saveButton).toContainElement(screen.getByTestId('TurnedInIcon'));
});


});
