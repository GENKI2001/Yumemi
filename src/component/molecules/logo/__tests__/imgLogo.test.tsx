import { render, screen } from '@testing-library/react';
import ImgLogo from '../ImgLogo';

describe('Logo component', () => {
  it('should render an image when img_src is provided', () => {
    const imageSrc = 'https://example.com/logo.png';
    render(<ImgLogo img_src={imageSrc} alt="Logo" />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', imageSrc);
    expect(imgElement).toHaveAttribute('alt', 'Logo');
  });

  it('should apply alt passed via the style prop', () => {
    const alt = 'custom-alt';
    render(<ImgLogo img_src="" alt={alt} />);
    const logoElement = screen.getByAltText(alt);
    expect(logoElement).toBeInTheDocument();
  });
});
