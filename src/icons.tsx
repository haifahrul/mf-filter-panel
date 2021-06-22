import * as React from 'react';
import {CSSProperties} from 'react';
import IconButton from '@material-ui/core/IconButton';

interface IIconProps {
    height?: string;
    width?: string;
    fill?: 'black' | 'white' | '#cacccf';
    onClick?: (payload: any) => void;
    style?: CSSProperties;
}

const defaultValue: IIconProps = {
    height: '24px',
    width: '24px',
    fill: 'black',
};

export const SearchIcon = (props: IIconProps = defaultValue) => {
    return <div style={props.style} className='icons-container' onClick={props.onClick}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={props.fill} width={props.width}
             height={props.height}>
            <path d='M0 0h24v24H0z' fill='none'/>
            <path
                // tslint:disable-next-line:max-line-length
                d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/>
        </svg>
    </div>;
};


export const VerticalDotIcon = (props: IIconProps = defaultValue) => {
    return <div className='icons-container' onClick={props.onClick}>
        <IconButton>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={props.fill} width={props.width}
                 height={props.height}>
                <path d='M0 0h24v24H0z' fill='none'/>
                <path
                    d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'/>
            </svg>
        </IconButton>
    </div>;
};

export const LastPageIcon = (props: IIconProps = defaultValue) => {
    return <div className='icons-container' onClick={props.onClick}>

        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={props.fill} width={props.width}
             height={props.height}>
            <path d='M0 0h24v24H0V0z' fill='none'/>
            <path d='M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z'/>
        </svg>

    </div>;
};
export const KeyboardArrowRight = (props: IIconProps = defaultValue) => {
    return <div className='icons-container' onClick={props.onClick}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={props.fill} width={props.width}
             height={props.height}>
            <path d='M0 0h24v24H0V0z' fill='none'/>
            <path d='M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z'/>
        </svg>

    </div>;
};
export const KeyboardArrowLeft = (props: IIconProps = defaultValue) => {
    return <div className='icons-container' onClick={props.onClick}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={props.fill} width={props.width}
             height={props.height}>
            <path d='M0 0h24v24H0V0z' fill='none'/>
            <path d='M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z'/>
        </svg>

    </div>;
};
export const FirstPageIcon = (props: IIconProps = defaultValue) => {
    return <div className='icons-container' onClick={props.onClick}>

        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={props.fill} width={props.width}
             height={props.height}>
            <path d='M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z'/>
            <path d='M24 24H0V0h24v24z' fill='none'/>
        </svg>

    </div>;
};

export const IconArrowBack = (props: IIconProps = defaultValue) => {
    return <div className='icons-container' onClick={props.onClick}>
        <IconButton>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={props.fill} width={props.width}
                 height={props.height}>
                <path d='M0 0h24v24H0z' fill='none'/>
                <path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/>
            </svg>
        </IconButton>
    </div>;
};

export const IconCancel = (props: IIconProps = defaultValue) => {
    return <div className='icons-container' onClick={props.onClick}>
        <IconButton>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={props.fill} width={props.width}
                 height={props.height}>
                <path d='M0 0h24v24H0z' fill='none'/>
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
            </svg>
        </IconButton>
    </div>;
};
