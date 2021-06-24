/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DatePickerView,
  } from '@material-ui/pickers';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { IDateRangeProps } from './interfaces';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { TFilterDateRange } from './types';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        keyboardDatePicker: {
            width: '100%',
        },
        keyboardButton: {
            color: '#F0444C',
            padding: '12px 0'
        }
    })
);

const DateRange: React.FC<IDateRangeProps> = (props: IDateRangeProps) => {
    const classes = useStyles();
    const views: DatePickerView[] = ['year', 'month', 'date'];
    const stringFormats = ['MM-DD-YYYY', 'YYYY-MM-DD', 'DD/MM/YYYY'];
    const formatDate = props?.options?.format || 'DD/MM/YYYY';
    const variant = props?.options?.variant || 'dialog';
    const inputVariant = props?.options?.inputVariant || 'outlined';
    const startDate = props?.value?.start ? moment(props?.value?.start, stringFormats) : null
    const endDate = props?.value?.end ? moment(props?.value?.end, stringFormats) : null
    
    const [minDate, setMinDate] = useState(moment('1900-01-01', stringFormats));
    const [maxDate, setMaxDate] = useState(moment());

    useEffect(() => {
        if (props?.options?.minDate) {
            setMinDate(moment(props?.options?.minDate, stringFormats));
        }

        if (props?.options?.maxDate) {
            setMaxDate(moment(props?.options?.maxDate, stringFormats));
        }
    }, [])
    
    const handleChange = (prop: TFilterDateRange, date: MaterialUiPickersDate) => {
        if (date) {
            props.onChange(props.field, {
                [props.field]: {
                    [prop]: date.format(formatDate),
                    [prop + 'Raw']: date
                }
            });
        }
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                
                <KeyboardDatePicker
                    className={classes.keyboardDatePicker}
                    margin='dense'
                    id={props.field + 'Start'}
                    label=''
                    placeholder='Start'
                    format={formatDate}
                    variant={variant}
                    inputVariant={inputVariant}
                    value={startDate}
                    onChange={date => {handleChange('start', date); }}
                    autoOk={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    views={views}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                        className: classes.keyboardButton
                    }}
                />

                <KeyboardDatePicker
                    className={classes.keyboardDatePicker}
                    margin='dense'
                    id={props.field + 'End'}
                    label=''
                    placeholder='End'
                    format={formatDate}
                    variant={variant}
                    inputVariant={inputVariant}
                    value={endDate}
                    onChange={date => {handleChange('end', date); }}
                    autoOk={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    views={views}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                        className: classes.keyboardButton
                    }}
                />

            </MuiPickersUtilsProvider>
        </div>
    );
};

export default DateRange;
