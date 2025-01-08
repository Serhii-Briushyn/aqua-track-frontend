import css from './PageContainer.module.css';

export const PageContainer = ({ children }) => {
    return (
        <div className={css.pageContainer}>
            <>
                {children}
            </>
        </div>
    )
}
