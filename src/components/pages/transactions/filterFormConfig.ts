import { TFilter } from "./type";

type Config = ( React.InputHTMLAttributes<HTMLInputElement> & {
    name: keyof TFilter;
    label?: string;
    validate?: (state: TFilter) => boolean;
})[]

export const filterConfig:Config = [
    {
        name: "min",
        type: 'text',
        min: '1',
        placeholder: 'Введите минимальную цену',
        label: 'Минимальная цена',
        id: 'min',
    },
        {
        name: "max",
        type: 'text',
        min: '1',
        placeholder: 'Введите максимальную цену',
        label: 'Максимальная цена',
        id: 'max',
    }
]

export const initialState: TFilter = {
    min: '',
    max: ''
}
