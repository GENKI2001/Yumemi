import { render, screen } from '@testing-library/react';
import ImgAtoms from '../ImgAtoms';

describe('Logo component', () => {
  // img_srcが提供された場合に画像がレンダリングされることを確認
  it('should render an image when img_src is provided', () => {
    const imageSrc = 'https://example.com/logo.png';
    render(<ImgAtoms img_src={imageSrc} />);
    // 画像要素が表示されていることを確認
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', imageSrc);
  });

  // altプロパティを介して渡されたaltが適用されることを確認
  it('should apply alt passed via the style prop', () => {
    const alt = 'custom-alt';
    render(<ImgAtoms img_src="" alt={alt} />);
    // alt属性が適用されていることを確認
    const imgElement = screen.getByAltText(alt);
    expect(imgElement).toBeInTheDocument();
  });
});
