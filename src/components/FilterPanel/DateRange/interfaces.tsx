import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IFilterPanelCore } from '../interfaces';
import { TFilterDateRangeInputVariant, TFilterDateRangeVariant } from './types';

/**
 * Date parsing, validating, manipulating and displaying date/time use moment.js
 */
export interface IDateRangeOptions {
    /**
     * Default is dialog
     */ 
    variant?: TFilterDateRangeVariant;

    /**
     * Default is outlined
     */ 
    inputVariant?: TFilterDateRangeInputVariant;

    /**
     * Default 'DD-MM-YYYY'. Date using moment.js
     */
    format?: string;

    /**
     * Default moment('1900-01-01')
     */
    minDate?: string;

    /**
     * Default now() + 1 day
     */
    maxDate?: string;
}

export interface IDateRange {
    /**
     * Accepted format date
     * e.g. 'MM-DD-YYYY', 'YYYY-MM-DD' and 'MM/DD/YYYY'
     */
    start?: string;

    /**
     * Accepted format date
     * e.g. 'MM-DD-YYYY', 'YYYY-MM-DD' and 'MM/DD/YYYY'
     */
    end?: string;

    /**
     * Return the full date of moment
     */
    startRaw?: MaterialUiPickersDate;

    /**
     * Return the full date of moment
     */
    endRaw?: MaterialUiPickersDate;
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
