

export const Tooltip = ({ text }: { text: string }) => {
    return (

        <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {text}
        </span>
    )

}