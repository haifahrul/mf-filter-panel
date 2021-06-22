import * as React from 'react';
// import clsx from 'clsx';
import { createStyles, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';
import { IInputAdornmentProps, IInputMinMaxProps } from './interfaces';
import { TFilterMinMax } from './types';

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

const inputAdornment = (pos: 'start' | 'end', props: IInputAdornmentProps|undefined) => {
    let component = null;

    if (props?.position === pos) {
        component = <InputAdornment position={props?.position}>{props?.label}</InputAdornment>;
    }

    return component;
};

const InputMinMax: React.FC<IInputMinMaxProps> = (props: IInputMinMaxProps) => {
    const classes = useStyles();
    const variant: any = props?.options?.variant || 'outlined';
    
    const handleChange = (prop: TFilterMinMax, value: string|number) => {
        props.onChange(props.field, {
            [props.field]: {
                [prop]: value
            }
        });
    };

    return (
        <div className={classes.root}>
            <TextField
                label=''
                id={props.field + 'Min'}
                className={classes.textField}
                // classes={{
                //     root: classes.root
                // }}
                // style={[classes.input]}
                style={{ fontSize: 14, fontFamily: 'Muli' }}
                placeholder='Minimum'
                InputProps={{
                    startAdornment: inputAdornment('start', props?.options?.adornment),
                    endAdornment: inputAdornment('end', props?.options?.adornment),
                }}
                InputLabelProps={{
                    className: classes.input,
                    shrink: true,
                    variant: 'filled'
                }}
                variant={variant}
                value={props?.value?.min}
                onChange={event => {handleChange('min', event.target.value); }}
            />

            <TextField
                label=''
                id={props.field + 'Max'}
                className={classes.textField}
                placeholder='Maximum'
                InputProps={{
                    startAdornment: inputAdornment('start', props?.options?.adornment),
                    endAdornment: inputAdornment('end', props?.options?.adornment),
                }}
                InputLabelProps={{
                    className: classes.input,
                    shrink: true
                }}
                variant={variant}
                value={props?.value?.max}
                onChange={event => {handleChange('max', event.target.value); }}
            />
        </div>
    );
};

export default InputMinMax;
