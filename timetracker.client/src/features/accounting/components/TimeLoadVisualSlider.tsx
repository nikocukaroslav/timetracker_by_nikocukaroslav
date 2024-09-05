import { Slider, SliderFilledTrack, SliderTrack } from "@chakra-ui/react";

interface TimeLoadVisualSliderProps {
    timeload: number
}

function TimeLoadVisualSlider({ timeload }: TimeLoadVisualSliderProps) {
    function handleColor() {
        if (timeload >= 100)
            return "green.500"
        if (timeload >= 50)
            return "orange.500"
        if (timeload < 50)
            return "red.500"
    }

    return (
        <Slider
            aria-label="timeload-slider"
            value={timeload}
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
