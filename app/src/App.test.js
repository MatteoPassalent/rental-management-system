import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import MaintenanceDialog from './dialogs/maintenanceDialog';
import AddCarDialog from './dialogs/addCarDialog';

test('Renders app layout', () => {
  render(<App />);
  const headerBar = screen.getByText(/Rental Car Management System/i);
  const inventoryBox = screen.getByText(/Inventory/i);
  const maintenanceBox = screen.getByText(/Maintenance/i);
  const rentedBox = screen.getByText(/Rented/i);

  expect(headerBar).toBeInTheDocument();
  expect(inventoryBox).toBeInTheDocument();
  expect(maintenanceBox).toBeInTheDocument();
  expect(rentedBox).toBeInTheDocument();
});

test('Submit button is disabled when form is invalid', () => {
  render(<MaintenanceDialog open={true} toggleOpen={() => {}} updateStatus={() => {}} car={{ id: '1' }} />);
  
  const submitButton = screen.getByRole('button', {name: 'Submit'})

  // Should be disabled with no input
  expect(submitButton).toBeDisabled();

  const daysInput = screen.getByLabelText(/Number of Days/i);

  // Should be disabled with invalid input
  fireEvent.change(daysInput, { target: { value: '0' } });
  expect(submitButton).toBeDisabled();
  fireEvent.change(daysInput, { target: { value: 'ABC' } });
  expect(submitButton).toBeDisabled();

  // Should be enabled with valid input
  fireEvent.change(daysInput, { target: { value: '1' } });
  expect(submitButton).toBeEnabled();
});

test('Add car is disabled until all fields full', () => {
  render(<AddCarDialog open={true} toggleOpen={() => {}} addCar={() => {}} />);

  const submitButton = screen.getByRole('button', {name: 'Add'})

  const make = screen.getByLabelText(/Make/i);
  const model = screen.getByLabelText(/Model/i);
  const year = screen.getByLabelText(/Year/i);
  const color = screen.getByLabelText(/Color/i);
  const license = screen.getByLabelText(/License Plate/i);

  expect(submitButton).toBeDisabled();
  fireEvent.change(make, { target: { value: 'test' } });
  expect(submitButton).toBeDisabled();
  fireEvent.change(model, { target: { value: 'test' } });
  expect(submitButton).toBeDisabled();
  fireEvent.change(year, { target: { value: 'test' } });
  expect(submitButton).toBeDisabled();
  fireEvent.change(color, { target: { value: 'test' } });
  expect(submitButton).toBeDisabled();
  fireEvent.change(license, { target: { value: 'test' } });
  expect(submitButton).toBeEnabled();
})
