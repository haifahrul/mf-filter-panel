import * as React from 'react';
import { createStyles, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';
import { IInputAdornmentProps, IInputMinMaxProps } from './interfaces';
import { TFilterInputMinMax } from './types';
import { NumberCleaner, NumberMasking } from './utils';
import './InputMinMax.scss';
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& input': {
                height: 1
            }
        },
        textField: {
            'width': '100%',
            'marginBottom': 12,
            '& input': {
                textAlign: 'right',
            }
        },
        helperText: {
            fontSize: 12,
            marginLeft: 0
        }
    })
);

const inputAdornment = (pos: 'start' | 'end', props: IInputAdornmentProps|undefined) => {
    let component = null;

    if (props?.position === pos) {
        component = <InputAdornment position={props?.position}><span className='__InputAdornment-root'>{props?.label}</span></InputAdornment>;
    }

    return component;
};

const InputMinMax: React.FC<IInputMinMaxProps> = (props: IInputMinMaxProps) => {
    const classes = useStyles();
    const variant: any = props?.options?.variant || 'outlined';
    
    const [type, setType] = useState<TFilterInputMinMax|null>(null)
    const [isMaxError, setIsMaxError] = useState<{error: boolean, text: string}>({
        error: false,
        text: ''
    });
    const [isMinError, setIsMinError] = useState<{error: boolean, text: string}>({
        error: false,
        text: ''
    });

    const clearValidation = (type: TFilterInputMinMax) => {
        if (type === 'min') {
            setIsMinError({
                error: false,
                text: ''
            });
        } else {
            setIsMaxError({
                error: false,
                text: ''
            });
        }
    }
    
    const applyValidationError = (type: TFilterInputMinMax) => {
        if (type === 'min') {
            setIsMinError({
                error: true,
                text: 'Minimun tidak boleh lebih besar dari maximum'
            });
        } else if (type === 'max') {
            setIsMaxError({
                error: true,
                text: 'Maximum tidak boleh lebih kecil dari minimum'
            });
        }
    }

    const handleChange = (type: TFilterInputMinMax, value: string) => {
        const amount = NumberCleaner(value);

        setType(type);
        
        props.onChange(props.field, {
            [props.field]: {
                [type]: amount || amount === 0 
                    ? amount
                    : ''
            }
        });
    };

    const amountMasking = (value: number) => {
        if (value || value === 0) {
            return NumberMasking(NumberCleaner(value.toString()));
        } else {
            return ''
        }
    }

    useEffect(() => {
        const max = props.value.max;
        const min = props.value.min;

        // Clear validation on reset - for type minimum only 
        if (!props?.value?.min) {
            clearValidation('min');
        }

        // Clear validation on reset - for type maximum only
        if (!props?.value?.max) {
            clearValidation('max');
        }

        // Validation on component mount
        if (!type) {
            if (min && max && min > max) {
                applyValidationError('max');
            } else if (min && max && max < min) {
                applyValidationError('min');
            }
        }

        // Validation on change
        if (type === 'max') {
            if (min && max && min > max) {
                applyValidationError('max');
                clearValidation('min');
            } else {
                clearValidation('max');
            }

        } else if (type === 'min') {
            if (min && max && max < min) {
                applyValidationError('min');
                clearValidation('max');
            } else {
                clearValidation('min');
            }

        }

    }, [props?.value?.max, props?.value?.min])

    return (
        <div className={classes.root}>
            <TextField
                id={props.field + 'MinRaw'}
                type='hidden'
                value={props?.value?.min}
            />
            <TextField
                label=''
                id={props.field + 'Min'}
                className={classes.textField}
                placeholder='Minimum'
                InputProps={{
                    startAdornment: inputAdornment('start', props?.options?.adornment),
                    endAdornment: inputAdornment('end', props?.options?.adornment),
                    value: amountMasking(props?.value?.min)
                }}
                InputLabelProps={{
                    shrink: true
                }}
                variant={variant}
                onChange={event => {handleChange('min', event.target.value); }}
                helperText={isMinError.text}
                FormHelperTextProps={{ className: classes.helperText  }}
                error={isMinError.error}
            />

            <TextField
                id={props.field + 'MaxRaw'}
                type='hidden'
                value={props?.value?.max}
            />
            <TextField
                label=''
                id={props.field + 'Max'}
                className={classes.textField}
                placeholder='Maximum'
                InputProps={{
                    startAdornment: inputAdornment('start', props?.options?.adornment),
                    endAdornment: inputAdornment('end', props?.options?.adornment),
                    value: amountMasking(props?.value?.max)
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                variant={variant}
                onChange={event => {handleChange('max', event.target.value); }}
                helperText={isMaxError.text}
                FormHelperTextProps={{ className: classes.helperText  }}
                error={isMaxError.error}
            />
        </div>
    );
};

export default InputMinMax;
