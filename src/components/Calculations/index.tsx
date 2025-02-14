import { useAllContext } from "../../context/AllContext";
import { RangeType } from "../../types";
import Abstract from "./Abstract";
import CapitalisationLossOfGroundRent from "./CapitalisationLossOfGroundRent";
import LossOfFreeholdReversion from "./LossOfFreeholdReversion";
import MarriageValue from "./MarriageValue";

const Calculations = () => {
    const {
        midRate,
        lowRate,
        highRate,
    } = useAllContext();

    const ranges: RangeType[] = [
        {
            label: 'Calculations - Mid Range',
            capitalisationRate: midRate,
        },
        {
            label: 'Calculations - Low Range',
            capitalisationRate: lowRate,
        },
        {
            label: 'Calculations - High Range',
            capitalisationRate: highRate,
        },
    ]

    return (
        <div className="flex flex-col w-full border border-1 border-light-green p-5">
            {
                ranges.map((item: RangeType, index: number) => (
                    <div key={index}>
                        <div className="title font-bold text-title-color text-2xl md:text-3xl my-6" >
                            {item.label}
                        </div>

                        <Abstract />

                        <CapitalisationLossOfGroundRent
                            capitalisationRate={item.capitalisationRate}
                        />

                        <LossOfFreeholdReversion />

                        <MarriageValue
                            capitalisationRate={item.capitalisationRate}
                        />

                        {
                            index < ranges.length - 1 && (
                                <hr className="mt-5"/>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
};

export default Calculations;