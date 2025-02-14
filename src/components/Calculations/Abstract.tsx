import { useEffect, useState } from "react";
import { getRelativityRate, } from "../../config";
import { useAllContext } from "../../context/AllContext";
import { RelativityRateType } from "../../types";

const Abstract = () => {
    const {
        durationYears,
        leaseEndDate,
        groundRent,
        longLeaseValueOfTheFlat,
        defermentRate,
    } = useAllContext();
    const [relativityRate, setRelativityRate] = useState<RelativityRateType>();

    useEffect(() => {
        (async () => {
            const newRelativityRate = await getRelativityRate(durationYears);
            setRelativityRate(newRelativityRate);
        })()
    }, [durationYears]);

    return (
        <div className="flex flex-col content text-sm md:text-base gap-y-2">
            <div>
                Section 42 Notice Date: {new Date().toLocaleDateString() ?? ''}
            </div>

            <div>
                Lease Expiration Date: {leaseEndDate.toLocaleDateString() ?? ''}
            </div>

            <div>
                Number of years remaining: {durationYears.toFixed(2)}
            </div>

            <div>
                New total lease term: {(durationYears + 90).toFixed(2)}
            </div>

            <div>
                Ground Rent: £{groundRent.toFixed(2)}
            </div>

            <div>
                Deferment Rate: {defermentRate.toFixed(2)}%
            </div>

            <div>
                Freehold Reversion Value: £{longLeaseValueOfTheFlat.toLocaleString('en-GB', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                })}
            </div>

            <div>
                {relativityRate?.result}
            </div>
        </div>
    )
};

export default Abstract;