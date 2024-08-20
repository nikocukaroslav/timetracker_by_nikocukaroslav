import useTitle from "@hooks/useTitle.ts";
import { Text, TextProps } from "@chakra-ui/react";

function TitledText({ title, children, ...props }: TextProps) {
    const { ref } = useTitle<HTMLParagraphElement>(title || "");

    return (
        <Text ref={ref} isTruncated {...props}>
            {children}
        </Text>
    );
}

export default TitledText;