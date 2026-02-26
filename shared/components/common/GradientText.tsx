const GradientText = ({
    text,
    colors,
    direction = "to right",
}: {
    text: string;
    colors: string[];
    direction?: string;
}) => {
    const gradientStyle: React.CSSProperties = {
        background: `linear-gradient(${direction}, ${colors.join(", ")})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
    };

    return <span style={gradientStyle}>{text}</span>;
};

export default GradientText;