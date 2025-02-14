import { useAllContext } from "../../context/AllContext";

const PropertyParticulars = () => {
    const {
        numberOfBedrooms,
        selectedFloorLevelOption,
        selectedFeaturesOption,
    } = useAllContext();

    return (
        <div className="flex flex-col w-full border border-1 border-light-green p-5">
            <div className="title text-title-color text-2xl md:text-3xl my-6 font-bold">
                Property Particulars
            </div>

            <div className="flex flex-col content text-sm md:text-base gap-y-4">
                <div>
                    The property is a {numberOfBedrooms} bedroom flat, located on the {selectedFloorLevelOption} floor. The property has {selectedFeaturesOption}.
                </div>

                <div className="title text-title-color text-2xl md:text-3xl my-6 font-bold">
                    Geographical Location
                </div>

                <div className="flex sm:w-full md:w-[90%] lg:w-[80%] gap-x-2 md:gap-x-5 lg:gap-x-10 h-[200px] md:h-[300px] lg:h-[400px]">
                    <div className="flex border border-1 border-black w-full justify-center items-center">
                        Image
                    </div>

                    <div className="flex border border-1 border-black w-full justify-center items-center">
                        Image
                    </div>
                </div>

                <div className="my-5 lg:my-10 font-bold">
                    Postcode:
                </div>
            </div>
        </div>
    )
};

export default PropertyParticulars;