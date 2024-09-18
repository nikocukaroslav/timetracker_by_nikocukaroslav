import { Slider, SliderFilledTrack, SliderTrack } from "@chakra-ui/react";


function TimeLoadVisualSlider({ percent }) {
    function handleColor() {
        if (percent >= 100)
            return "green.500"
        if (percent >= 50)
            return "orange.500"
        if (percent < 50)
            return "red.500"
    }

    return (
        <Slider
            aria-label="timeload-slider"
            value={percent}
            isReadOnly
            focusThumbOnChange={false}
            isDisabled
        >
            <SliderTrack bg="gray.300" h="18px" rounded="md">
                <SliderFilledTrack bg={handleColor()}/>
            </SliderTrack>
        </Slider>
    );
}

export default TimeLoadVisualSlider;
