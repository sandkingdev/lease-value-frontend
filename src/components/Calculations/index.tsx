import Abstract from "./Abstract";
import CapitalisationLossOfGroundRent from "./CapitalisationLossOfGroundRent";
import LossOfFreeholdReversion from "./LossOfFreeholdReversion";

const Calculations = () => {

    return (
        <div className="flex flex-col w-full border border-1 border-light-green p-5">
            <div className="title font-bold text-title-color text-2xl md:text-3xl my-6">
                Calculations - Mid Range
            </div>

            <Abstract />

            <CapitalisationLossOfGroundRent />

            <LossOfFreeholdReversion />
        </div>
    )
};

export default Calculations;