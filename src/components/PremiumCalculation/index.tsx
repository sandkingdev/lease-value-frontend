import { useState } from "react";
import { calculatePremium, getPremiumValue, levels, premiumCalculationYears } from "../../config";
import { useAllContext } from "../../context/AllContext";

const PremiumCalculation = () => {
    const [propertyInflationRate, setPropertyInflationRate] = useState<number>(6);
    const {
        durationYears,
        groundRent,
        longLeaseValueOfTheFlat,
        capitalisationRate,
        defermentRate,
    } = useAllContext();

    return (
        <div className="flex flex-col w-full border border-1 border-light-green p-5">
            <div className="title text-title-color !text-xl md:text-3xl my-3 font-bold">
                If you waited to extend your lease, the premium would incease:
            </div>

            <div className="flex flex-col content text-sm md:text-base gap-y-2">
                <div>
                    Please refer to the remainder of this report for a full breakdown of your calculations. The following summary is provided:
                </div>

                <div className="address flex gap-x-4 items-center">
                    <div className="">
                        Property Inflation Rate (% per annum):
                    </div>
                    <div className="flex items-center gap-x-2">
                        <input
                            className={`flex rounded-lg border text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0 w-[100px]`}
                            type='number'
                            value={propertyInflationRate}
                            onChange={(eV) => {
                                const value = eV.target.value;

                                if (value === '' || /^\d+(\.\d{0,1})?$/.test(value)) {
                                    setPropertyInflationRate(parseFloat(value));
                                }
                            }}
                        />
                        <div className="">%</div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-4">
                    {
                        premiumCalculationYears.map((item: number, index: number) => {
                            const futureNumberOfYearsRemaining = durationYears - item;
                            let premiumIncrease = 0;
                            if (futureNumberOfYearsRemaining >= 0) {
                                const adjustedValue = longLeaseValueOfTheFlat * Math.pow(1 + propertyInflationRate / 100, item);
                                const futurePremium = calculatePremium(
                                    futureNumberOfYearsRemaining,
                                    groundRent,
                                    adjustedValue,
                                    capitalisationRate,
                                    defermentRate,
                                    levels.medium
                                );
                                const mediumPremium = calculatePremium(
                                    durationYears,
                                    groundRent,
                                    longLeaseValueOfTheFlat,
                                    capitalisationRate,
                                    defermentRate,
                                    levels.medium
                                );
                                premiumIncrease = getPremiumValue(futurePremium) - getPremiumValue(mediumPremium);
                            }

                            return (
                                <div key={index}>
                                    {`If you wait another ${item} year${(item > 1) ? 's' : ''} to extend, the premium will increase by £${premiumIncrease.toFixed(0).toLocaleString()}`}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default PremiumCalculation;