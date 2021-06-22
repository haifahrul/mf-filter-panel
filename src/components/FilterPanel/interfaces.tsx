import { IDateRange, IDateRangeOptions } from './DateRange/interfaces';
import { IInputMinMax, IInputMinMaxOptions } from './InputMinMax/interfaces';
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
    value?: IFilterPanelValue;
    options?: IFilterPanelOptions;
}

export interface IFilterPanelValue extends IDateRange, IInputMinMax {}

export interface IFilterPanelOptions {
    // date?: {}; // TODO
    dateRange?: IDateRangeOptions;
    checkbox?: {};
    // input?: {}; // TODO
    inputMinMax?: IInputMinMaxOptions;
}

export interface IFilterPanelOnChange {
    field: string;
    values: object | string | number | boolean;
}
