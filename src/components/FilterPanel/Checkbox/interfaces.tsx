import { IFilterPanelCore } from '../interfaces';

export interface ICheckboxOptions {
    formLabel?: string;
    formText?: string;
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
    onChange: (field: string, values: object) => void;
}
