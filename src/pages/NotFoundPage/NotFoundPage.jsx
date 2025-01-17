import css from "./NotFoundPage.module.css";
import notFoundImage from "../assets/images/not-found-image.png";

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <img className={css.image} src={notFoundImage} alt="Not Found" />
    </div>
  );
};
export default NotFoundPage;
