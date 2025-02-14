import { calculatePremium, formatAndRoundToTens, getPremiumValue, levels } from "../../config";
import { useAllContext } from "../../context/AllContext";

const SummaryofResults = () => {
    const {
        durationYears,
        groundRent,
        longLeaseValueOfTheFlat,
        midRate,
        defermentRate,
    } = useAllContext();

    return (
        <div className="flex flex-col w-full border border-1 border-light-green p-5">
            <div className="title font-bold text-title-color text-2xl md:text-3xl my-6">
                Summary of Results
            </div>

            <div className="flex flex-col content text-sm md:text-base gap-y-4">
                <div>
                    Please refer to the remainder of this report for a full breakdown of your calculations. The following summary is provided:
                </div>

                <div className="font-bold text-custom-color-1">
                    Expected Premium Payable: £ {
                        formatAndRoundToTens(String(getPremiumValue(calculatePremium(
                            durationYears,
                            groundRent,
                            longLeaseValueOfTheFlat,
                            midRate,
                            defermentRate,
                            levels.medium
                        ))))
                    }
                </div>

                <div className="font-bold text-custom-color-2">
                    Low-Range £ {
                        formatAndRoundToTens(String(getPremiumValue(calculatePremium(
                            durationYears,
                            groundRent,
                            longLeaseValueOfTheFlat,
                            midRate,
                            defermentRate,
                            levels.low
                        ))))
                    }
                </div>

                <div className="font-bold text-custom-color-3">
                    High-Range £ {
                        formatAndRoundToTens(String(getPremiumValue(calculatePremium(
                            durationYears,
                            groundRent,
                            longLeaseValueOfTheFlat,
                            midRate,
                            defermentRate,
                            levels.high
                        ))))
                    }
                </div>

                <div>
                    These figures are based upon an extension of 90 years to the unexpired term, with the ground rent reduced to nil (a peppercorn) for the remainder of the lease term (net of costs).
                </div>

                <div>
                    Please note that above figure should be regarded as a reasonable outcome. While we can justify this amount, it is likely that the freeholder will seek a higher premium, as this is common practice in such negotiations. The premium is largely influenced by the estimated value of the property, which we have determined using comparable evidence and current market trends.
                </div>
            </div>
        </div>
    )
};

export default SummaryofResults;