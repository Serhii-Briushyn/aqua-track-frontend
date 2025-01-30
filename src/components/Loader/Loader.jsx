import { ThreeDots } from "react-loader-spinner";

import css from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={css.overlay}></div>
      <div className={css.loader}>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#9be1a0"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    </>
  );
};

export default Loader;
