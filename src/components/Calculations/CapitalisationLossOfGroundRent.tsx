import { useEffect, useState } from "react";
import { useAllContext } from "../../context/AllContext";

const CapitalisationLossOfGroundRent = () => {
    const {
        capitalisationRate,
        durationYears,
        groundRent,
    } = useAllContext();
    const [yearsPurchase, setYearsPurchase] = useState<number>(0);

    useEffect(() => {
        const capRate = capitalisationRate / 100;
        const newYearsPurchase = ((1 - (1 / Math.pow(1 + capRate, durationYears))) / capRate);
        setYearsPurchase(newYearsPurchase);
    }, [capitalisationRate, durationYears]);

    return (
        <div className="flex flex-col content text-sm md:text-base gap-y-2 mt-10">
            <div className="title font-bold text-title-color text-xl md:text-2xl">
                Capitalisation / Loss of Ground Rent
            </div>

            <div>
                Years Purchase (YP) @ <strong>{capitalisationRate}</strong>% = {yearsPurchase?.toFixed(4)}
            </div>

            <div>
                Ground rent £{groundRent.toFixed(2)} x YP of {yearsPurchase?.toFixed(4)} = <strong>£</strong>{(groundRent * yearsPurchase).toFixed(2)}
            </div>
        </div>
    )
};

export default CapitalisationLossOfGroundRent;