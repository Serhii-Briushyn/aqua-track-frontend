import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <img
        className={css.image}
        src="/src/assets/images/not-found-image.jpg"
      />
    </div>
  );
};
export default NotFoundPage;
