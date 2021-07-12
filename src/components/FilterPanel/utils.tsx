import { IFilterPanelFormMeta } from './interfaces';
import { ICheckbox } from './Checkbox/interfaces';
import { IDateRange } from './DateRange/interfaces';
import { IInputMinMax } from './InputMinMax/interfaces';

/**
 * To convert form meta to object with values.
 * The object only have a value will be convert.
 * 
 * @returns object
 */
export const formMetaToObjectValues = (formMeta: IFilterPanelFormMeta[]) => {
    let obj = {};

    formMeta.forEach((v) => {
        switch (v.type) {
            case 'dateRange':
                if (v?.value) {
                    obj = {
                        ...obj,
                        [`start${v.field}`]: (v.value as IDateRange).start,
                        [`end${v.field}`]: (v.value as IDateRange).end
                    };
                }
                break;
            case 'checkbox':
                if (v?.value) {
                    (v.value as ICheckbox[]).forEach(cv => {
                        if (cv.checked) {
                            obj = {
                                ...obj,
                                [`${v.field}[]`]: cv.value
                            };
                        }
                    });
                }
                break;
            case 'inputMinMax':
                if (v?.value) {
                    obj = {
                        ...obj,
                        [`min${v.field}`]: (v.value as IInputMinMax).min,
                        [`max${v.field}`]: (v.value as IInputMinMax).max
                    };
                }
                break;
            default:
                console.log(
                    `Error: ${v.type} is unknown and not a part of TFilterType`
                );
                break;
        }
    });

    return obj;
};
