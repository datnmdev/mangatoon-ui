function Spinner({ size = '32px', color = '#7b10ff', background = '#f3f0f0' }) {
    return (
        <span 
            className="inline-block rounded-[50%] rotate-90 animate-fastSpin"
            style={{
                width: size,
                height: size,
                borderWidth: `calc(${size}/8)`,
                borderColor: background,
                borderTopColor: color,
                borderBottomColor: color
            }}
        ></span>
    )
}

export default Spinner