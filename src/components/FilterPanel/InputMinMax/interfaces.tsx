import { IFilterPanelCore } from '../interfaces';

export interface IInputMinMaxOptions {
    adornment?: IInputAdornmentProps;

    /**
     * Default is outlined
     */ 
    readonly variant?: 'standard' | 'outlined' | 'filled';
}

export interface IInputMinMax {
    min?: number;
    max?: number;
}

export interface IInputMinMaxProps extends IFilterPanelCore {
    value?: IInputMinMax;
    options?: IInputMinMaxOptions;
    onChange: (field: string, value: IInputMinMax) => void;
}

export interface IInputAdornmentProps {
    label: string;
    readonly position: 'start' | 'end';
}

