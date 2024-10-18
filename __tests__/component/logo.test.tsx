import { render, screen } from '@testing-library/react'
import NexSphereLogo from '@/src/component/logo'


describe('Test NexSphereLogo component', () => {
  it('renders a NexSphereLogo', () => {
    render(<NexSphereLogo />)
    const logo = screen.getByText('NexSphere');
    expect(logo).toBeInTheDocument();
  })
  
})