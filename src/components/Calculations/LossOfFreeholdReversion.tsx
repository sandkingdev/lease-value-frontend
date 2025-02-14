import { useEffect, useState } from "react";
import { useAllContext } from "../../context/AllContext";
import { extensionYears } from "../../config";

const LossOfFreeholdReversion = () => {
    const {
        capitalisationRate,
        durationYears,
        defermentRate,
        longLeaseValueOfTheFlat,
    } = useAllContext();
    const [presentValue, setPresentValue] = useState<number>(0);
    const [futureValue, setFutureValue] = useState<number>(0);

    useEffect(() => {
        const newPresentValue = 1 / Math.pow(1 + defermentRate / 100, durationYears);
        setPresentValue(newPresentValue);

        const extendedDurationYears = durationYears + 90;
        const newFutureValue = 1 / Math.pow(1 + defermentRate / 100, extendedDurationYears);
        setFutureValue(newFutureValue);
    }, [capitalisationRate, durationYears]);

    return (
        <div className="flex flex-col content text-sm md:text-base gap-y-2 mt-10">
            <div className="title font-bold text-title-color text-xl md:text-2xl">
                Loss of Freehold Reversion
            </div>

            <div>
                Present Value (PV) of £1 in {durationYears.toFixed(2)} years at <strong>{defermentRate.toFixed(2)}</strong>% = {presentValue.toFixed(4)}
            </div>

            <div className="font-bold">
                Landlord's Current Interest: {presentValue.toFixed(4)} multiplied by {
                    longLeaseValueOfTheFlat.toLocaleString('en-GB', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    })
                } = <strong>£</strong>{
                    (presentValue * longLeaseValueOfTheFlat).toLocaleString('en-GB', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 3
                    })
                }
            </div>

            <div>
                Present Value (PV) of £1 in {(durationYears + extensionYears).toFixed(2)} years at <strong>{defermentRate.toFixed(2)}</strong>% = {futureValue.toFixed(4)}
            </div>

            <div className="font-bold">
                Landlord's Future Interest: {futureValue.toFixed(4)} multiplied by {
                    longLeaseValueOfTheFlat.toLocaleString('en-GB', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    })
                } = <strong>£</strong>{
                    (futureValue * longLeaseValueOfTheFlat).toLocaleString('en-GB', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 3
                    })
                }
            </div>

            <div className="font-bold">
                Landlord's Combined Interest: <strong>£</strong>{
                    ((presentValue - futureValue) * longLeaseValueOfTheFlat).toLocaleString('en-GB', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 3
                    })
                }
            </div>

        </div>
    )
};

export default LossOfFreeholdReversion;