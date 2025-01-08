import css from './PageContainer.module.css';

export const RightSideWrapper = ({children}) => {
    return (
        <div className={css.rightSideWrapper}>
            {children}
        </div>
    )
}
