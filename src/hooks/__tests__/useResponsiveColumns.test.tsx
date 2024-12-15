import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useResponsiveColumns from '../useResponsiveColumns';

// テスト用に `window.innerWidth` をモックする
const mockWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize')); // イベントをトリガー
};

describe('useResponsiveColumns', () => {
  it('Number of columns changes according to window size', () => {
    const { result } = renderHook(() => useResponsiveColumns());

    // 初期幅を設定 (default 6 columns)
    expect(result.current).toBe(6);
    // 幅を変更し再計算されるか確認
    act(() => {
      mockWindowWidth(1300); // 幅 > 1200 の場合は 7 カラム
    });
    expect(result.current).toBe(7);

    // 幅を変更し再計算されるか確認
    act(() => {
      mockWindowWidth(1100); // 幅 > 900 の場合は 6 カラム
    });
    expect(result.current).toBe(6);

    act(() => {
      mockWindowWidth(700); // 幅 <= 600 の場合は 5 カラム
    });
    expect(result.current).toBe(5);

    act(() => {
      mockWindowWidth(500); // 幅 <= 600 の場合は 5 カラム
    });
    expect(result.current).toBe(4);

    act(() => {
      mockWindowWidth(300); // 幅 <= 600 の場合は 5 カラム
    });
    expect(result.current).toBe(3);
  });

  it('Resize event is correctly canceled', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useResponsiveColumns());

    // イベントリスナーが追加されているか確認
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );

    // フックがアンマウントされた際にイベントリスナーが解除されるか確認
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });
});
