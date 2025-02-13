import { useEffect, useState } from "react";
import { useAllContext } from "../../context/AllContext";
import { featuresOptions, floorLevelOptions } from "../../config";
import { FeaturesOption, FloorLevelOptionType } from "../../types";

const InputComponent = () => {
    const {
        setLeaseEndDate,
        setValuationDate,
        numberOfBedrooms,
        setNumberOfBedrooms,
        selectedFloorLevelOption,
        setSelectedFloorLevelOption,
        selectedFeaturesOption,
        setSelectedFeaturesOption,
        groundRent,
        setGroundRent,
        longLeaseValueOfTheFlat,
        setLongLeaseValueOfTheFlat,
        defermentRate,
        setDefermentRate,
        capitalisationRate,
        setCapitalisationRate,
        lowRate,
        setLowRate,
        highRate,
        setHighRate,
        address,
        setAddress,
    } = useAllContext();
    const [endDate, setEndDate] = useState<string>();
    const [startDate, setStartDate] = useState<string>();

    useEffect(() => {
        window.alert(endDate);
        if (endDate) setLeaseEndDate((new Date(`${endDate}T12:00:00`)));
        if (startDate) setValuationDate((new Date(`${startDate}T12:00:00`)));
    }, [
        endDate,
        startDate,
    ]);

    const handleFloorLevel = (event: any) => {
        setSelectedFloorLevelOption(event.target.value);
    };

    const handleFeatures = (event: any) => {
        setSelectedFeaturesOption(event.target.value);
    };

    return (
        <div className="flex w-full border border-1 border-light-green p-3 md:p-5">
            <div className="flex">
                <div className="flex flex-col gap-y-2 text-sm md:text-base">
                    <div className="lease-end-date flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Lease End Date:
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border w-full text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0`}
                                type='date'
                                value={endDate}
                                defaultValue={'2108-12-24'}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="lease-start-date flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Valuation Date:
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border w-full text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0`}
                                type='date'
                                value={startDate}
                                defaultValue={'2033-03-01'}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="number-of-bedrooms flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Number of Bedrooms:
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border w-full text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0`}
                                type='number'
                                value={numberOfBedrooms}
                                onChange={(e) => setNumberOfBedrooms(parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="floor-level flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Floor Level:
                        </div>
                        <div className="">
                            <div className="w-64">
                                <select
                                    className="border p-2 rounded-md flex rounded-lg border text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0 bg-custom-dark-1"
                                    value={selectedFloorLevelOption}
                                    onChange={handleFloorLevel}
                                >
                                    <option value="" disabled>Select an option</option>
                                    {
                                        floorLevelOptions.map((item: FloorLevelOptionType, index: number) => (
                                            <option value={item.value} key={index}>{item.label}</option>
                                        ))
                                    }

                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="features flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Features:
                        </div>
                        <div className="">
                            <div className="w-64">
                                <select
                                    className="border p-2 rounded-md flex rounded-lg border text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0 bg-custom-dark-1"
                                    value={selectedFeaturesOption}
                                    onChange={handleFeatures}
                                >
                                    <option value="" disabled>Select an option</option>
                                    {
                                        featuresOptions.map((item: FeaturesOption, index: number) => (
                                            <option value={item.value} key={index}>{item.label}</option>
                                        ))
                                    }

                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="ground-rent flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Ground Rent (pa):
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border w-full text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0`}
                                type='number'
                                value={groundRent}
                                onChange={(e) => setGroundRent(parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="long-lease-value-of-the-flat flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Long Lease Value of the Flat:
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border w-full text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0`}
                                type='number'
                                value={longLeaseValueOfTheFlat}
                                onChange={(e) => setLongLeaseValueOfTheFlat(parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="long-lease-value-of-the-flat flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Deferment Rate %:
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border w-full text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0`}
                                type='number'
                                value={defermentRate}
                                onChange={(eV) => {
                                    const value = eV.target.value;

                                    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
                                        setDefermentRate(parseFloat(value));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="long-lease-value-of-the-flat flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Capitalisation Rate %:
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border w-full text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0`}
                                type='number'
                                value={capitalisationRate}
                                onChange={(eV) => {
                                    const value = eV.target.value;

                                    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
                                        setCapitalisationRate(parseFloat(value));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="long-lease-value-of-the-flat flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Low Rate %:
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border w-full text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0`}
                                type='number'
                                value={lowRate}
                                onChange={(eV) => {
                                    const value = eV.target.value;

                                    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
                                        setLowRate(parseFloat(value));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="long-lease-value-of-the-flat flex gap-x-4 items-center">
                        <div className="font-bold ">
                            High Rate %:
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border w-full text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0`}
                                type='number'
                                step={0.01}
                                value={highRate}
                                onChange={(eV) => {
                                    const value = eV.target.value;

                                    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
                                        setHighRate(parseFloat(value));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="address flex gap-x-4 items-center">
                        <div className="font-bold ">
                            Address:
                        </div>
                        <div className="">
                            <input
                                className={`flex rounded-lg border text-sm font-semibold h-9 px-2.5 cursor-pointer placeholder-custom-white-5 focus:shadow-[rgba(16,24,40,0.05)] focus-visible:outline-0 focus:outline-0 w-full sm:w-[300px]`}
                                type='text'
                                value={address}
                                placeholder={'9 Cranbourne Court, Stevenage, SG1 4RE'}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default InputComponent;