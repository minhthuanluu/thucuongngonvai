import React from "react";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import "react-toastify/dist/ReactToastify.css";

export const AlertAddCart = () => {
  const { t } = useTranslation()
  const notify = () =>
    toast.success(t('homepage.addCartSuccess'), {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <button onClick={notify} className="button-type-one btn-order-product">
      {t('homepage.addCart')}
      </button>
    </>
  );
};

export const AlertCheckOut = ({ enabledButton }) => {
  const { t } = useTranslation()
  const notify = () =>
    toast.success(t('homepage.paymentSuccess'), {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <button disabled={!enabledButton} onClick={notify}>
      {t('homepage.payment')}
      </button>
    </>
  );
};
