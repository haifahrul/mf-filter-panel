import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IFilterPanelCore } from '../interfaces';
import { TFilterDateRangeInputVariant, TFilterDateRangeVariant } from './types';

export interface IDateRangeOptions {
    variant?: TFilterDateRangeVariant; // default is dialog
    inputVariant?: TFilterDateRangeInputVariant; // default is outlined
    format?: string; // default 'DD-MM-YYYY'. Date using moment.js
    minDate?: string; // default moment('1900-01-01')
    maxDate?: string; // default now + 1 day. Date using moment.js
}

export interface IDateRange {
    start?: string; // e.g. MM-DD-YYYY' or 'YYYY-MM-DD
    end?: string; // e.g. MM-DD-YYYY' or 'YYYY-MM-DD
    startRaw?: MaterialUiPickersDate; // full raw of moment.js
    endRaw?: MaterialUiPickersDate; // full raw of moment.js
}

export interface IDateRangeProps extends IFilterPanelCore {
    value?: IDateRange;
    options?: IDateRangeOptions;
    onChange: (field: string, values: object) => void;
}

export interface IInputAdornmentProps {
    label: string;
    position: 'start' | 'end';
}

