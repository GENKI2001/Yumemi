// ホームのtemplatesを作成
import React, { useEffect, useState } from 'react';
import { PopulationType } from '../../interface/population';
import { PrefectureType } from '../../interface/prefecture';
import ModeButtons from '../organisms/button/ModeButtons';
import PopulationChart from '../organisms/chart/PopulationChart';
import PrefecturesCheckboxGrid from '../organisms/checkboxGrid/PrefecturesCheckboxGrid';
import AppHeader from '../organisms/header/AppHeader';
import ModeSection from '../organisms/titleSection/ModeSection';
import PrefecturePopulationSection from '../organisms/titleSection/PrefecturePopulationSection';
import PrefectureSelectSection from '../organisms/titleSection/PrefectureSelectSection';
import './HomeTemplate.css';

interface HomeTemplateProps {
  selectedPrefectures: PrefectureType[];
  prefectures: PrefectureType[];
  population: PopulationType[];
}

const HomeTemplate: React.FC<HomeTemplateProps> = (props) => {
  // あとでロジックを切り分けます。今はここに書いています。
  const [columns, setColumns] = useState<number>(6); // デフォルトで6カラム

  // ウィンドウの幅に応じてカラム数を計算
  const calculateColumns = (width: number): number => {
    if (width > 1200) return 7;
    if (width > 900) return 6;
    if (width > 600) return 5;
    if (width > 450) return 4;
    return 3;
  };

  useEffect(() => {
    // 初回のカラム数設定
    setColumns(calculateColumns(window.innerWidth));

    const handleResize = () => {
      setColumns(calculateColumns(window.innerWidth));
    };

    window.addEventListener('resize', handleResize); // リサイズイベントを監視
    return () => {
      window.removeEventListener('resize', handleResize); // クリーンアップ
    };
  }, []);

  return (
    <div className="home-template">
      {/* ヘッダー部分 */}
      <AppHeader
        img_src={
          (process.env.REACT_APP_BASE_URL
            ? process.env.REACT_APP_BASE_URL + '/'
            : '') + 'yumemi.png'
        }
      />

      {/* コンテンツ部分 */}
      <div className="home-template-content">
        {/* 最初のタイトル */}
        <PrefecturePopulationSection />

        {/* グラフチャート */}
        <section className="home-template-chart-section">
          <PopulationChart
            title="都道府県別の総人口"
            label={'年少人口'}
            populationData={props.population ?? []}
          />
        </section>

        {/* 表示モード選択 */}
        <section className="home-template-mode-section">
          <ModeSection />
          <ModeButtons />
        </section>

        {/* 都道府県チェックボックス */}
        <section className="home-template-prefecture-section">
          <PrefectureSelectSection />
          <PrefecturesCheckboxGrid
            columns={columns}
            selectedPrefectures={props.selectedPrefectures}
            prefectures={props.prefectures}
            onChange={() => {
              console.log('');
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default HomeTemplate;
