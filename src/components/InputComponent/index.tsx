import { useAllContext } from "../../context/AllContext";

const InputComponent = () => {
    // const { leaseEndDate, setLeaseEndDate, valuationDate, setValuationDate, } = useAllContext();

    return (
        <div>
            <div className="font-bold text-2xl">
                Lease End Date
            </div>
        </div>
    )
};

export default InputComponent;