import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react";

function CustomSlider({onChange, value}) {
    const marks = [];
    for (let i = 10; i <= 150; i += 10) {
        marks.push(
            <SliderMark key={i} value={i} mt="3" ml="-2" fontSize="xs" color="gray.700">
                {i}
            </SliderMark>
        );
    }

    return (
        <Box p="2">
            <Slider onChange={onChange} value={value} aria-label="slider-ex" defaultValue={0} min={0} max={150}
                    step={10}>
                {marks}
                <SliderTrack bg="gray.200">
                    <SliderFilledTrack bg="gray.400"/>
                </SliderTrack>
                <SliderThumb boxSize={5} bg="gray.400"/>
            </Slider>
        </Box>
    );
}

export default CustomSlider;