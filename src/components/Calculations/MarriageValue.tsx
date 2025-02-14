import { useEffect, useState } from "react";
import { useAllContext } from "../../context/AllContext";

const MarriageValue = () => {
    const {
        capitalisationRate,
        durationYears,
        defermentRate,
        longLeaseValueOfTheFlat,
        groundRent,
        relativityRate,
    } = useAllContext();
    const [futureValue, setFutureValue] = useState<number>(0);
    const [valueAfterMarriage, setValueAfterMarriage] = useState<number>(0);
    const [landlordCurrentInterest, setLandlordCurrentInterest] = useState<number>(0);
    const [tenantCurrentInterest, setTenantCurrentInterest] = useState<number>(0);
    const [sigma, setSigma] = useState<number>(0);

    useEffect(() => {
        const newPresentValue = 1 / Math.pow(1 + defermentRate / 100, durationYears);

        const extendedDurationYears = durationYears + 90;
        const newFutureValue = 1 / Math.pow(1 + defermentRate / 100, extendedDurationYears);
        setFutureValue(newFutureValue);

        const capRate = capitalisationRate / 100;
        const newYearsPurchase = ((1 - (1 / Math.pow(1 + capRate, durationYears))) / capRate);

        const newValueAfterMarriage = newFutureValue * longLeaseValueOfTheFlat + longLeaseValueOfTheFlat;
        setValueAfterMarriage(newValueAfterMarriage);

        const newLandlordCurrentInterest = groundRent * newYearsPurchase + newPresentValue * longLeaseValueOfTheFlat;
        setLandlordCurrentInterest(newLandlordCurrentInterest);

        const newTenantCurrentInterest = longLeaseValueOfTheFlat * relativityRate.value / 100;
        setTenantCurrentInterest(newTenantCurrentInterest);

        const combinedInterest = (newPresentValue - newFutureValue) * longLeaseValueOfTheFlat;
        const newSigma = groundRent * newYearsPurchase + combinedInterest + (durationYears > 80 ? 0 : (newValueAfterMarriage - (landlordCurrentInterest + newTenantCurrentInterest)) / 2);
        setSigma(newSigma);
    }, [
        capitalisationRate,
        durationYears,
        defermentRate,
        longLeaseValueOfTheFlat,
        groundRent,
        relativityRate,
    ]);

    return (
        <div className="flex flex-col content text-sm md:text-base gap-y-2 mt-10">
            <div className="title font-bold text-title-color text-xl md:text-2xl">
                Marriage Value
            </div>

            {
                durationYears > 80 ? (
                    <div>
                        Marriage value is not applicable
                    </div>
                ) : (
                    <>
                        <div>
                            Long Lease / Freehold Reversion Value: {
                                longLeaseValueOfTheFlat.toLocaleString('en-GB', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }
                        </div>

                        <div>
                            Tenant's Future Interest: £{
                                longLeaseValueOfTheFlat.toLocaleString('en-GB', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }
                        </div>

                        <div>
                            Landlord's Future Interest: £{
                                (futureValue * longLeaseValueOfTheFlat).toLocaleString('en-GB', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }
                        </div>

                        <div className="font-bold">
                            Value after marriage: £{
                                (valueAfterMarriage).toLocaleString('en-GB', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }
                        </div>

                        <div>
                            Landlord's Current Interest: £{
                                (landlordCurrentInterest).toLocaleString('en-GB', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }
                        </div>

                        <div>
                            Tenant's Current Interest: £{
                                (tenantCurrentInterest).toLocaleString('en-GB', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }
                        </div>

                        <div className="font-bold">
                            Value Before Marriage: £{
                                (landlordCurrentInterest + tenantCurrentInterest).toLocaleString('en-GB', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }
                        </div>

                        <div>
                            Difference between before and after: {
                                (valueAfterMarriage - (
                                    landlordCurrentInterest + tenantCurrentInterest)).toLocaleString('en-GB', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })
                            }
                        </div>

                        <div>
                            50% of the difference: £{
                                ((valueAfterMarriage - (landlordCurrentInterest + tenantCurrentInterest)) / 2).toLocaleString('en-GB', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            }
                        </div>
                    </>
                )
            }

            <div className="font-bold text-title-color">
                Total of loss of ground rent, loss of freehold reversion and marriage value: £{
                    sigma.toLocaleString('en-GB', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                }
            </div>
        </div >
    )
};

export default MarriageValue;