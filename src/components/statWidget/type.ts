import { JSX } from "react";

export interface IPropsStatWidget {
    styles:   React.CSSProperties;
    icon: JSX.Element;
    tittle: string;
    smallText: string;
    dataStat: {
        data: number | string,
        isLoading: boolean,
        isError: boolean,
        isSuccess: boolean, 
    };
}