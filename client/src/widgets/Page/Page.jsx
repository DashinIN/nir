import s from './Page.module.scss';

export const Page = (({children}) => {
   
    return (
        <main className={s.Page}>
            {children}
        </main>
    );
});
