import * as React from 'react';
// import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ICheckbox, ICheckboxProps } from './interfaces';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& .MuiCheckbox-root': {
                fontSize: 16,
                color: 'green'
            }
            // '& .MuiTextField-root': {
            //     margin: theme.spacing(1),
            //     fontSize: 14, 
            //     fontFamily: 'Muli',
            //     color: 'red'
            //     // width: '25ch',
            // },
            // '& .MuiOutlinedInput-root': {
            //     fontSize: 14, 
            //     fontFamily: 'Muli',
            //     // color: 'red',
            //     height: 36
            // }
        },
        formControl: {
            margin: theme.spacing(1),
            // marginTop: '-10px',
            // marginBottom: 6,
        },
        formLabel: {
            margin: theme.spacing(1),
            // height: 36,
            marginTop: theme.spacing(4)
        },
        margin: {
            margin: theme.spacing(1),
        },
        // withoutLabel: {
        //     marginTop: theme.spacing(3),
        // },
        textField: {
            width: '100%',
            marginBottom: 8
        },
    })
);

const FilterCheckbox: React.FC<ICheckboxProps> = (props: ICheckboxProps) => {
    const classes = useStyles();
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const items = props.value.map(item => {
            if (item.name === event.target.name) {
                item = {
                    ...item,
                    checked: event.target.checked
                };
            }
            return item
        });

        props.onChange(props.field, {
            [props.field]: [
                ...items
            ]
        });
    };

    const layout = (item: ICheckbox, index: number) => {
        return (
            <React.Fragment key={index}>
                <FormControlLabel
                    control={<Checkbox checked={item.checked} onChange={handleChange} name={item.name} />}
                    label={item.label}
                />
            </React.Fragment>
        )
    };

    return (
        <div className={classes.root}>
            <FormControl component='fieldset' className={classes.formControl}>
                
                {
                    props?.options?.formLabel &&
                        <FormLabel className={classes.formControl} component='legend'>{props?.options?.formLabel}</FormLabel>
                }

                <FormGroup>
                    {
                        props?.value?.length > 0 && 
                            props.value.map((p: ICheckbox, i: number) => layout(p, i))
                    }
                </FormGroup>   

                {
                    props?.options?.formLabel &&
                        <FormHelperText>{props?.options?.formText}</FormHelperText>
                }
                
            </FormControl>
            
        </div>
    );
};

export default FilterCheckbox;
