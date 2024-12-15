import { render, screen } from '@testing-library/react';
import ImgLogo from '../ImgLogo';

describe('Logo component', () => {
  it('should render an image when img_src is provided', () => {
    const imageSrc = 'https://example.com/logo.png';
    render(<ImgLogo img_src={imageSrc} alt="Logo" />);
    // 画像要素が表示されていることを確認
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', imageSrc);
    expect(imgElement).toHaveAttribute('alt', 'Logo');
  });

  it('should apply alt passed via the style prop', () => {
    const alt = 'custom-alt';
    render(<ImgLogo img_src="" alt={alt} />);
    // alt属性が適用されていることを確認
    const logoElement = screen.getByAltText(alt);
    expect(logoElement).toBeInTheDocument();
  });
});
