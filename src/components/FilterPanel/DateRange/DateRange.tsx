/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';
import { useState, useEffect } from 'react';
import MomentUtils from '@date-io/moment';
import { ThemeProvider } from '@material-ui/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DatePickerView,
  } from '@material-ui/pickers';
import { createStyles, createMuiTheme, makeStyles, Theme } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IDateRangeProps } from './interfaces';
import { TFilterDateRange } from './types';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        keyboardDatePicker: {
            width: '100%'
        },
        keyboardButton: {
            color: '#F0444C',
            padding: '12px 0'
        },
        helperText: {
            fontSize: 12,
            marginLeft: 0
        }
    })
);

const muiTheme = createMuiTheme({
    overrides: {
        MuiButton: {
            label: {
                fontSize: 12,
                color: '#25282B'
            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: 'white',
                color: '#25282B',
            }
        },
        MuiPickersToolbarText: {
            toolbarTxt: {
                fontSize: 16,
                color: '#25282B'
            },
            toolbarBtnSelected: {
                fontSize: 16,
                color: '#25282B'
            }
        },
        MuiPickersCalendarHeader: {
            dayLabel: {
                fontSize: 12
            },
            switchHeader: {
                backgroundColor: 'white',
                color: '#25282B',
            },
        },
        MuiPickersCalendarFooter: {
            switchHeader: {
                backgroundColor: 'white',
            },
        },
        MuiPickersBasePicker: {
            pickerView:{
                backgroundColor: 'white'
            }
        },
        MuiPickersYear: {
            root: {
                fontSize: 12,
            },
            current: {
                color: '#25282B',
                backgroundColor: '#FAFAFA',
            },
            yearSelected: {
                color: 'white',
                backgroundColor: '#25282B',
                borderRadius: '50px',
                margin: '10px 35%'
            }
        },
        MuiPickersMonth: {
            root: {
                fontSize: 12
            },
            current: {
                color: '#25282B',
                backgroundColor: '#25282B'
            },
            monthSelected: {
                color: 'white',
                backgroundColor: '#25282B',
                borderRadius: '50px'
            }
        },
        MuiPickersDay: {
            day: {
                fontFamily: 'Muli',
                fontSize: 12
            },
            daySelected: {
                backgroundColor: '#25282B',
                color:'white'
            },
            current: {
                backgroundColor: '#FAFAFA',
                color: '#25282B',
            },
        },
        MuiTypography: {
            colorInherit: {
                fontSize: 12,
            },
            body1: {
                fontSize: 12
            }
        },
        MuiPickersSlideTransition: {
            transitionContainer: {
                fontSize: 12,
            }
        }
    },
    palette: {
        primary: {
            main: '#25282B'
        }
    }
  });
  
const DateRange: React.FC<IDateRangeProps> = (props: IDateRangeProps) => {
    const classes = useStyles();
    const views: DatePickerView[] = ['year', 'month', 'date'];
    const stringFormats = ['MM-DD-YYYY', 'YYYY-MM-DD', 'DD/MM/YYYY'];
    const formatDate = props?.options?.format || 'DD/MM/YYYY';
    const variant = props?.options?.variant || 'dialog';
    const inputVariant = props?.options?.inputVariant || 'outlined';
    const startDate = props?.value?.start ? moment(props?.value?.start, stringFormats) : null;
    const endDate = props?.value?.end ? moment(props?.value?.end, stringFormats) : null;
    
    const [minDate, setMinDate] = useState(moment('1900-01-01', stringFormats));
    const [maxDate, setMaxDate] = useState(moment());

    const [type, setType] = useState<TFilterDateRange|null>(null)
    const [isStartError, setIsStartError] = useState<{error: boolean, text: string}>({
        error: false,
        text: ''
    });
    const [isEndError, setIsEndError] = useState<{error: boolean, text: string}>({
        error: false,
        text: ''
    });

    const clearValidation = (type: TFilterDateRange) => {
        if (type === 'start') {
            setIsStartError({
                error: false,
                text: ''
            });
        } else {
            setIsEndError({
                error: false,
                text: ''
            });
        }
    }
    
    const applyValidationError = (type: TFilterDateRange) => {
        if (type === 'start') {
            setIsStartError({
                error: true,
                text: 'Start Date tidak boleh lebih besar dari End Date'
            });
        } else if (type === 'end') {
            setIsEndError({
                error: true,
                text: 'End Date tidak boleh lebih kecil dari Start Date'
            });
        }
    }

    useEffect(() => {
        if (props?.options?.minDate) {
            setMinDate(moment(props?.options?.minDate, stringFormats));
        }

        if (props?.options?.maxDate) {
            setMaxDate(moment(props?.options?.maxDate, stringFormats));
        }
    }, []);
    
    const handleChange = (type: TFilterDateRange, date: MaterialUiPickersDate) => {
        let dF: string = null;
        let d: MaterialUiPickersDate = null; 

        setType(type);

        if (date) {
            dF = date.format(formatDate);
            d = date;
        }

        props.onChange(props.field, {
            [props.field]: {
                [type]: dF,
                [type + 'Raw']: d
            }
        });
    };

    useEffect(() => {
        const start = props?.value?.startRaw;
        const end = props?.value?.endRaw;

        // Clear validation on reset - for type minimum only 
        if (!props?.value?.end) {
            clearValidation('end');
        }

        // Clear validation on reset - for type maximum only
        if (!props?.value?.start) {
            clearValidation('start');
        }

        // Validation on component mount
        if (!type) {
            if (end && start && !start.isSameOrBefore(end, 'days')) {
                applyValidationError('start');
            } else if (end && start && !start.isSameOrBefore(end, 'days')) {
                applyValidationError('end');
            }
        }

        // Validation on change
        if (type === 'start') {
            if (end && start && !start.isSameOrBefore(end, 'days')) {
                applyValidationError('start');
                clearValidation('end');
            } else {
                clearValidation('start');
            }

        } else if (type === 'end') {
            if (end && start && !start.isSameOrBefore(end, 'days')) {
                applyValidationError('end');
                clearValidation('start');
            } else {
                clearValidation('end');
            }

        }

    }, [props?.value?.start, props?.value?.end])

    return (
        <div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <ThemeProvider theme={muiTheme}>
                    
                    <KeyboardDatePicker
                        className={classes.keyboardDatePicker}
                        margin='dense'
                        clearable={true}
                        id={props.field + 'Start'}
                        label=''
                        placeholder='Start Date'
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
                            'aria-label': 'change start date',
                            'className': classes.keyboardButton
                        }}
                        helperText={isStartError.text}
                        FormHelperTextProps={{ className: classes.helperText  }}
                        error={isStartError.error}
                    />

                    <KeyboardDatePicker
                        className={classes.keyboardDatePicker}
                        margin='dense'
                        clearable={true}
                        id={props.field + 'End'}
                        label=''
                        placeholder='End Date'
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
                            'aria-label': 'change end date',
                            'className': classes.keyboardButton
                        }}
                        helperText={isEndError.text}
                        FormHelperTextProps={{ className: classes.helperText  }}
                        error={isEndError.error}
                    />

                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default DateRange;
