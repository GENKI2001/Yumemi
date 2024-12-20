import React from 'react';
import useAuthPopup from '../../hooks/useAuthPopup';
import useResponsiveColumns from '../../hooks/useResponsiveColumns';
import { PopulationLabel, PopulationType } from '../../interface/population';
import { PrefectureType } from '../../interface/prefecture';
import ModeButtons from '../organisms/button/ModeButtons';
import PopulationChart from '../organisms/chart/PopulationChart';
import PrefecturesCheckboxGrid from '../organisms/checkboxGrid/PrefecturesCheckboxGrid';
import AppHeader from '../organisms/header/AppHeader';
import LoginPopup from '../organisms/popup/LoginPopup';
import RegisterPopup from '../organisms/popup/RegisterPopup';
import CSVSection from '../organisms/titleSection/CSVSection';
import ModeSection from '../organisms/titleSection/ModeSection';
import PrefecturePopulationSection from '../organisms/titleSection/PrefecturePopulationSection';
import PrefectureSelectSection from '../organisms/titleSection/PrefectureSelectSection';
import './HomeTemplate.css';

interface HomeTemplateProps {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  handleRegister: (email: string, password: string) => void;
  selectedPrefectures: PrefectureType[];
  prefectures: PrefectureType[];
  headerLogoImagePath: string;
  population: PopulationType[];
  handleSelectedPrefectures: (prefecture: PrefectureType) => void;
  mode: PopulationLabel;
  handleChangeMode: (mode: PopulationLabel) => void;
}

const HomeTemplate: React.FC<HomeTemplateProps> = (props) => {
  const columns = useResponsiveColumns(6);
  const {
    openLoginPopup,
    openRegisterPopup,
    handleClosePopup,
    handleOpenLoginPopup,
    handleOpenRegisterPopup,
  } = useAuthPopup();

  return (
    <div className="home-template">
      <AppHeader
        img_src={props.headerLogoImagePath}
        isLoggedIn={props.isLoggedIn}
        handleLogout={props.handleLogout}
        handleLogin={handleOpenLoginPopup}
        handleRegister={handleOpenRegisterPopup}
      />

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

        <section className="home-template-csv-section">
          <CSVSection />
        </section>
      </div>
      <LoginPopup
        isOpen={openLoginPopup}
        onClose={handleClosePopup}
        handleLogin={props.handleLogin}
        handleOpenRegisterPopup={handleOpenRegisterPopup}
      />
      <RegisterPopup
        isOpen={openRegisterPopup}
        onClose={handleClosePopup}
        handleLogin={props.handleLogin}
        handleRegister={props.handleRegister}
        handleOpenLoginPopup={handleOpenLoginPopup}
      />
    </div>
  );
};

export default HomeTemplate;
