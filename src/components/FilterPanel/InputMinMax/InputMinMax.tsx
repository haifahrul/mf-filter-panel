import * as React from 'react';
import { createStyles, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';
import { IInputAdornmentProps, IInputMinMaxProps } from './interfaces';
import { TFilterInputMinMax } from './types';
import { NumberCleaner } from './utils';
import './InputMinMax.scss';

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

    const handleChange = (type: TFilterInputMinMax, value: string) => {
        const amount = NumberCleaner(value);

        props.onChange(props.field, {
            [props.field]: {
                [type]: amount.real
            }
        });
    };

    const amountMasking = (value: number) => {
        return NumberCleaner(value.toString()).masking;
    }

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
            />
        </div>
    );
};

export default InputMinMax;
