import { Header } from "../components/organism/Header";

export const Dashboard = ({children}) => {

    return (
        <>
            <Header></Header>
            <main>
                {children}
            </main>
        </>
    );
};
