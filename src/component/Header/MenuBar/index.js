import React from "react";
import { Link } from "react-router-dom";
import images from "../../../assets/images";
import i18n from "../../../Language/translation/i18n";
import { useTranslation } from 'react-i18next';

function MenuBar() {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }
  const { t } = useTranslation()
  return (
    <>
      <ul id="menu-menu-chinh" className="menu">
        <li
          id="menu-item-1271"
          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1262 current_page_item menu-item-1271"
        >
          <Link to="/thucuongngonvai">
            {t('homepage.home')}
          </Link>
        </li>
        <li
          id="menu-item-1551"
          className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1551"
        >
          <Link to="/login">{t('homepage.login')}</Link>
        </li>
        <li
          id="menu-item-1551"
          className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1551"
          style={{marginRight: "5px"}}
        >
          <button onClick={() => changeLanguage('vi')}><img src={images.languageVN} /></button>
        </li>
        <li
          id="menu-item-1551"
          className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1551"
        >
           <button onClick={() => changeLanguage('en')}><img src={images.languageUS} /></button>
        </li>
      </ul>
    </>
  );
}

export default MenuBar;
