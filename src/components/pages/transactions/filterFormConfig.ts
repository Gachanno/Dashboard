type Config = ( React.InputHTMLAttributes<HTMLInputElement> & {
    name: keyof FormDataI;
    label?: string;
    validate?: (state: FormDataI) => boolean;
})[]

export type FormDataI = {
    min: string
    max: string
}

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

export const initialState: FormDataI = {
    min: '',
    max: ''
}
