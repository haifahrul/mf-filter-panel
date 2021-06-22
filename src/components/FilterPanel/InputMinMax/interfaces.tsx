import { IFilterPanelCore } from '../interfaces';

export interface IInputMinMaxOptions {
    adornment?: IInputAdornmentProps;
    variant?: 'standard' | 'outlined' | 'filled'; // default is outlined
}

export interface IInputMinMax {
    min?: string | number;
    max?: string | number;
}

export interface IInputMinMaxProps extends IFilterPanelCore {
    value?: IInputMinMax;
    options?: IInputMinMaxOptions;
    onChange: (field: string, values: object) => void;
}

export interface IInputAdornmentProps {
    label: string;
    position: 'start' | 'end';
}

