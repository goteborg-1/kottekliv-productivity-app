import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Button from './Button'

test("render button with correct text and trigger function when clicked", async () => {
  const user = userEvent.setup()
  const onClick = jest.fn()
  render(<Button onClick={onClick}>Click here</Button>)

  await user.click(screen.getByRole("button", {name: /click here/i}))

  expect(screen.getByRole("button", {name: /click here/i})).toBeInTheDocument()
  expect(onClick).toHaveBeenCalledTimes(1)
})