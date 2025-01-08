import css from './PageContainer.module.css';

export const LeftSideWrapper = ({children}) => {
    return (
        <div className={css.leftSideWrapper}>
            {children}
        </div>
    )
}
