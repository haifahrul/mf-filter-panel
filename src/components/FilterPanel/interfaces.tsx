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

/**
 * Usage:
 *          
        [
            {
                title: "Order Date",
                type: "dateRange",
                field: "orderDate",
                value: {
                    start: '2021-06-20',
                    end: '2021-06-22'
                },
                options: {
                    dateRange: {
                        variant: 'inline',
                        minDate: '2021-06-20',
                        maxDate: '2021-06-28'
                    }
                }
            },
            {
                title: "Store Order Total",
                type: "inputMinMax",
                field: "storeOrderTotal",
                value: {
                    min: 123,
                    max: 456
                },
                options: {
                    inputMinMax: {
                        adornment: {
                            label: "Rp",
                            position: "start"
                        },
                    },
                },
            }
        ]
 */
export interface IFilterPanelFormMeta extends IFilterPanelCore {
    type: TFilterType;

    /**
     * The value must be match with type
     * 
     * e.g. 
     * 
     *      {
     *          type: "dateRange",
     *          value: {
     *              start: '2021-06-20',
     *              end: '2021-06-22'
     *          }
     *      }   
     */ 
    value?: IFilterPanelValue;

    /**
     * The options must be match with type
     * 
     * e.g. 
     * 
     *      {
     *          type: "dateRange",
     *          options: {
     *              dateRange: {
                        variant: "inline",
                        minDate: "2021-06-20",
                        maxDate: "2021-06-28",
                        inputVariant: "standard",
     *              }
     *          }
     *      }   
     */ 
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
