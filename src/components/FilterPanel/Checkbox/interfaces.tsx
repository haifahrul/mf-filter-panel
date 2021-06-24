import { IFilterPanelCore } from '../interfaces';

export interface ICheckboxOptions {
    formLabel?: string;
    formText?: string;

    /**
     * Default is 1 column
     */
    column?: 1 | 2;
}

export interface ICheckbox {
    label: string;
    name: string;
    value: string | number;
    checked: boolean;
}

export interface ICheckboxProps extends IFilterPanelCore {
    value?: ICheckbox[];
    options?: ICheckboxOptions;
    width?: number;
    onChange: (field: string, values: object) => void;
}
