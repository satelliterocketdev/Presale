import React, { useState, createContext, useContext } from 'react'
import './DiscountForm.scss';

export const DiscountSelectionContext = createContext({
    selectedDicountFormIndex: 0,
    setSelectedDicountFormIndex: (index: number) => {}
});

const DiscountForm = (props: any) => {

    const index: number = props.index || 0;
    const { selectedDicountFormIndex, setSelectedDicountFormIndex } = useContext(DiscountSelectionContext);
   
    const selectedStyle: any = {
        backgroundColor: '#FFF',
        border: '8px solid #35924a',
        borderRadius: '18px',
        boxShadow: '0 0 2px #888',
        height: '30px',
        width: '30px'
    };

    const noneSelectedStyle: any = {
        border: '2px solid #888',
        borderRadius: '18px',
        boxShadow: '0 0 2px #888',
        height: '30px',
        width: '30px'
    }

    return (
        <div className={`presale-discount-form ${index === selectedDicountFormIndex ? 'selected' : ''}`} onClick={() => setSelectedDicountFormIndex(index)}>
            <div className="presale-discount-form-circle-radio" style={selectedDicountFormIndex === index ? selectedStyle : noneSelectedStyle} ></div>
            <div className="presale-discount-form-title">{props.discount.title}</div>
            <div className="presale-discount-form-cliff">{props.discount.cliff}</div>
            <div className="presale-discount-form-vesting">{props.discount.vesting}</div>
            {index === 0 ? (
                <div className="presale-discount-form-yearly">&nbsp;</div>
            ) : (
                <div className="presale-discount-form-yearly">{props.discount.yearly}</div>
            )}
        </div>
    );
}

export default DiscountForm;