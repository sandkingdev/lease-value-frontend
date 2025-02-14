import { useEffect, useState } from "react";
import { getStringOfRemainingYears } from "../../config";
import { useAllContext } from "../../context/AllContext";

const LeaseExtensionValuation = () => {
    const {
        leaseEndDate,
        valuationDate,
    } = useAllContext();
    const [remainingYearsObject, setRemainingYearsObject] = useState<any>();

    useEffect(() => {
        setRemainingYearsObject(getStringOfRemainingYears(valuationDate, leaseEndDate));
    }, [leaseEndDate, valuationDate]);

    return (
        <div className="flex flex-col w-full border border-1 border-light-green p-5">
            <div className="title font-bold text-title-color text-2xl md:text-3xl my-6">
                Lease Extension Valuation
            </div>

            <div className="flex flex-col content text-sm md:text-base gap-y-4">
                <div>
                    This report has been provided based upon your recent insructions and provides you with an expected valuation of the premium becessary to purchase a <strong>90-year extension</strong> to the existing lease at the above named property with ground rent cancelled to a peppercorn (nil).
                </div>

                <div>
                    Your Valuation Date is: {valuationDate?.toLocaleDateString() ?? ''}. This is the presumed date of the service of the Section 42 notice to commence the lease extension process. This date may change depending on your instructions and as such, will have an impact on the premium. The longer the postponement, the greater the change to the valuation figures.
                </div>

                <div>
                    Your existing lease end date is: {leaseEndDate?.toLocaleDateString() ?? ''}
                </div>

                <div className={`${!remainingYearsObject?.status && 'text-label-warning-color'}`}>
                    {remainingYearsObject?.result}
                </div>
            </div>
        </div>
    )
};

export default LeaseExtensionValuation;