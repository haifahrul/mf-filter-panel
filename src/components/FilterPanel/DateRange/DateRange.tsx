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
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                fontSize: 14, 
                fontFamily: 'Muli',
                color: 'red'
                // width: '25ch',
            },
            '& .MuiOutlinedInput-root': {
                fontSize: 14, 
                fontFamily: 'Muli',
                // color: 'red',
                height: 36
            },
            '& .MuiFormControl': {
                height: 36
            }
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '100%',
            marginBottom: 8
        },
        textField2: {
            fontSize: 14, 
            fontFamily: 'Muli',
            color: 'red'
        },
        // focused: {
            // border: '1px solid #E8E8E8'
            // border: {

            //     borderColor: '#E8E8E8'
            // }
        // },
        input: {
            color: 'red',
            fontSize: 12
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
        <div className={classes.root}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                
                <KeyboardDatePicker
                    className={classes.textField}
                    margin='normal'
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
                    }}
                />

                <KeyboardDatePicker
                    className={classes.textField}
                    margin='normal'
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
                    }}
                />

            </MuiPickersUtilsProvider>
        </div>
    );
};

export default DateRange;
