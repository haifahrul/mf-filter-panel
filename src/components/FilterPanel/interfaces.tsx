import { ICheckbox, ICheckboxOptions } from './Checkbox/interfaces';
import { IDateRange, IDateRangeOptions } from './DateRange/interfaces';
import { IInputMinMax, IInputMinMaxOptions } from './InputMinMax/interfaces';
import { TFilterType } from './types';

export interface IFilterPanelCore {
    title: string;
    field: string;
}

export interface IFilterPanelProps {
    /**
     * Default anchor is `right`
     */
    readonly anchor?: 'right' | 'left';

    /**
     * Default headerTitle is `Filter Panel`
     */
    headerTitle?: string;

    /**
     * Default width is `280px`
     */
    width?: number;

    open: boolean;
    formMeta: IFilterPanelFormMeta[];
    onClose: () => void;
    onReset?: () => void;
    onSubmit: (event: IFilterPanelOnSubmit) => void;
    onChange?: (event: IFilterPanelOnChange) => void;
}

/**
 * 
 * There is 3 types of filter form:
 * 
 * 1. Date Range
 * 2. Input Min Max
 * 3. Checkbox
 * 
 * *NOTE:
 * 
 * Type `'Checkbox'` must be have a key value and have
 * at least 1 object or interface ICheckbox. 
 * 
 * Please check an example below.
 * 
 * Usage:
 *          
 *      [
 *          {
 *              title: 'Order Date',
 *              type: 'dateRange',
 *              field: 'orderDate',
 *              value: {
 *                  start: '2021-06-20',
 *                  end: '2021-06-22'
 *              },
 *              options: {
 *                  dateRange: {
 *                      variant: 'inline',
 *                      minDate: '2021-06-20',
 *                      maxDate: '2021-06-28'
 *                  }
 *              }
 *          },
 *          {
 *              title: 'Store Order Total',
 *              type: 'inputMinMax',
 *              field: 'storeOrderTotal',
 *              value: {
 *                  min: 123,
 *                  max: 456
 *              },
 *              options: {
 *                  inputMinMax: {
 *                      adornment: {
 *                          label: 'Rp',
 *                          position: 'start'
 *                      },
 *                  },
 *              },
 *          },
 *          {
 *              title: 'Payment Type',
 *              type: 'checkbox',
 *              field: 'paymentType',
 *              value: [
 *                  { label: 'Bayar Nanti', name: 'payNow', value: '1', checked: false },
 *                  { label: 'Bayar Sekarang', name: 'payLatter', value: '2', checked: false },
 *                  { label: 'Bayar di Tempat', name: 'cod', value: '3', checked: false }
 *              ]
 *          }
 *      ]
 */
export interface IFilterPanelFormMeta extends IFilterPanelCore {
    type: TFilterType;

    /**
     * The value must be match with type
     * 
     * e.g. type `dateRange` key value is `'start'` and `'end'`
     * 
     *      {
     *          type: 'dateRange',
     *          value: {
     *              start: '2021-06-20',
     *              end: '2021-06-22'
     *          }
     *      }   
     */ 
    value?: IDateRange | IInputMinMax | ICheckbox[];

    /**
     * The options must be match with type
     * 
     * e.g. 
     * 
     *      {
     *          type: 'dateRange',
     *          options: {
     *              dateRange: {
     *                  variant: 'inline',
     *                  minDate: '2021-06-20',
     *                  maxDate: '2021-06-28',
     *                  inputVariant: 'standard',
     *              }
     *          }
     *      }   
     */ 
    options?: IFilterPanelOptions;
}

export interface IFilterPanelFormMetaValue extends IDateRange, IInputMinMax, Array<ICheckbox> {}

export interface IFilterPanelOptions {
    // date?: {}; // TODO: if necessary
    dateRange?: IDateRangeOptions;
    checkbox?: ICheckboxOptions;
    // input?: {}; // TODO: if necessary
    inputMinMax?: IInputMinMaxOptions;
}

export interface IFilterPanelOnChange {
    field: string;
    value: object | string | number | boolean;
}

export interface IFilterPanelOnSubmit {
    value: object;
    formMeta: IFilterPanelFormMeta[];
    query: object;
}

export interface IUpdateFormMeta {
    field: string;
    type: TFilterType;
    value: IDateRange | IInputMinMax | ICheckbox[];
}
