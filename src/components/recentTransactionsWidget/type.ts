import { JSX } from "react";

export interface IPropsRTW {
    styles:   React.CSSProperties;
    icon: JSX.Element;
    tittle: string;
    dataTransaction: {
        data: ITransaction,
        isLoading: boolean,
        isError: boolean,
        isSuccess: boolean, 
    };
}