import { useEffect } from "react";
import { useAllContext } from "../../context/AllContext";
import { calculatePremium, drawPremiumBarChart, drawPremiumChart, generatePremiumData, getPremiumValue, levels } from "../../config";

const PremiumChart = () => {
    const {
        groundRent,
        longLeaseValueOfTheFlat,
        midRate,
        defermentRate,
        durationYears,
    } = useAllContext();

    useEffect(() => {
        let xMin = Math.floor((durationYears - 10) / 10) * 10;
        if (xMin < 0) xMin = 0;
        let xMax = Math.ceil((durationYears + 10) / 10) * 10;
        if (xMax < 90) xMax = 90;

        const dataLow = generatePremiumData(groundRent, longLeaseValueOfTheFlat, midRate, defermentRate, levels.low, xMin, xMax);
        const dataMedium = generatePremiumData(groundRent, longLeaseValueOfTheFlat, midRate, defermentRate, levels.medium, xMin, xMax);
        const dataHigh = generatePremiumData(groundRent, longLeaseValueOfTheFlat, midRate, defermentRate, levels.high, xMin, xMax);

        const chartData = [
            {
                data: dataHigh,
                color: '#ff0000',
                label: 'High'
            },
            {
                data: dataMedium,
                color: '#ff9915',
                label: 'Medium Premium'
            },
            {
                data: dataLow,
                color: '#53beb4',
                label: 'Low'
            }
        ];

        const mediumPremium = calculatePremium(
            durationYears,
            groundRent,
            longLeaseValueOfTheFlat,
            midRate,
            defermentRate,
            levels.medium
        );

        drawPremiumChart(chartData, {
            yearsLeft: durationYears,
            premium: getPremiumValue(mediumPremium),
        }, xMin, xMax);

        const {
            lostRent,
            landlordValue,
            marriageValue
        } = calculatePremium(
            durationYears,
            groundRent,
            longLeaseValueOfTheFlat,
            midRate,
            defermentRate,
            levels.medium
        )

        // Bar chart
        drawPremiumBarChart(lostRent, landlordValue, marriageValue);
    }, [
        groundRent,
        longLeaseValueOfTheFlat,
        midRate,
        defermentRate,
        durationYears,
    ])

    return (
        <div className="flex flex-col w-full border border-1 border-light-green p-5">
            <div className="title text-title-color text-xl md:text-2xl my-6 font-bold">
                How the premium would change depending on the years remaining:
            </div>

            <div id="chart"></div>

            <div>
                The above chart assumes all variables are fixed, for example no increase in property value over time.
            </div>

            <div className="title text-title-color text-xl md:text-2xl my-6 font-bold">
                A breakdown of how the premium is comprised:
            </div>

            <div id="premium-bar-chart"></div>
            <div id="chart-legend" className="flex gap-4 mt-3"></div>
            <br />

            <div className="my-3 lg:my-5">
                Lease extension calculations only include 'marriage value' where the remaining term on the lease is less than 80 years.
            </div>
        </div>
    )
};

export default PremiumChart;