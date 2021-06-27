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
    readonly variant?: TFilterDateRangeVariant;

    /**
     * Default is outlined
     */ 
    readonly inputVariant?: TFilterDateRangeInputVariant;

    /**
     * Default 'DD/MM/YYYY'. Date using moment.js
     */
    format?: string;

    /**
     * Default 'YYYY-MM-DD'. Date using moment.js
     */
    outputFormatDate?: string;

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
    onChange: (field: string, value: IDateRange) => void;
}
