import { IInputMinMaxOptions, IInputMinMax } from './InputMinMax/interfaces';
import { TFilterType } from './types';

export interface IFilterPanelCore {
    title: string;
    field: string;
}

export interface IFilterPanelProps {
    anchor?: 'right';
    open: boolean;
    formMeta: IFilterPanelFormMeta[];
    onClose: () => void;
    onSubmit: (form: object) => void;
    onChange?: (event: IFilterPanelOnChange) => void;
}

export interface IFilterPanelFormMeta extends IFilterPanelCore {
    type: TFilterType;
    value?: IInputMinMax;
    options?: IFilterPanelOptions;
}

export interface IFilterPanelOptions {
    date?: {};
    dateMinMax?: {};
    checkbox?: {};
    input?: {};
    inputMinMax?: IInputMinMaxOptions;
}

export interface IFilterPanelOnChange {
    field: string;
    values: object|string|number|boolean;
}
