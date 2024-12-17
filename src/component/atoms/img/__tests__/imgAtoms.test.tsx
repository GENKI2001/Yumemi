import { render, screen } from '@testing-library/react';
import ImgAtoms from '../ImgAtoms';

describe('Logo component', () => {
  it('should render an image when img_src is provided', () => {
    const imageSrc = 'https://example.com/logo.png';
    render(<ImgAtoms img_src={imageSrc} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', imageSrc);
  });

  it('should apply alt passed via the style prop', () => {
    const alt = 'custom-alt';
    render(<ImgAtoms img_src="" alt={alt} />);
    const imgElement = screen.getByAltText(alt);
    expect(imgElement).toBeInTheDocument();
  });
});
