import React from 'react';
import useResponsiveColumns from '../../hooks/useResponsiveColumns';
import { PopulationLabel, PopulationType } from '../../interface/population';
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
  handleSelectedPrefectures: (prefecture: PrefectureType) => void;
  mode: PopulationLabel;
  handleChangeMode: (mode: PopulationLabel) => void;
}

const HomeTemplate: React.FC<HomeTemplateProps> = (props) => {
  const columns = useResponsiveColumns(6);

  return (
    <div className="home-template">
      <AppHeader img_src={'yumemi.png'} />

      <div className="home-template-content">
        <PrefecturePopulationSection />

        <section className="home-template-chart-section">
          <PopulationChart
            title={'都道府県別の' + props.mode}
            label={props.mode}
            populationData={props.population ?? []}
          />
        </section>

        <section className="home-template-mode-section">
          <ModeSection />
          <ModeButtons mode={props.mode} onClick={props.handleChangeMode} />
        </section>

        <section className="home-template-prefecture-section">
          <PrefectureSelectSection />
          <PrefecturesCheckboxGrid
            columns={columns}
            selectedPrefectures={props.selectedPrefectures}
            prefectures={props.prefectures}
            onChange={(prefecture: PrefectureType) => {
              props.handleSelectedPrefectures(prefecture);
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default HomeTemplate;
