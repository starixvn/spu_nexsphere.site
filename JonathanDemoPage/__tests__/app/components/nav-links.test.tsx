import { render, screen } from '@testing-library/react'
import AcmeLogo from '@/app/component/acme-logo'


describe('Test Navlink component', () => {
  it('renders a Navlink', () => {
    render(<AcmeLogo />)

    // const button = screen.getByText('Click me');

    // const buttons = screen.getAllByText('Click me');

    // expect(buttons).toBeInTheDocument();

  })
  
})