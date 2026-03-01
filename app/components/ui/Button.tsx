type ButtonProps = {
    content: string;
    onClick(): void;
    isImg?: boolean;
    image?: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({content, onClick, isImg, image, className}) => {
    return(
        <>
            {isImg ? (
                <button onClick={onClick} className={`flex gap-[8px] lg:gap-[12px] items-center cursor-pointer ${className}`}>
                    {content}
                    {image}    
                </button>
            ) : (
                <button onClick={onClick} className="bg-[#155DA4] text-[#FFFFFF] text-[12px] sm:text-[12px] lg:text-[16px] rounded-[4px] sm:rounded-[8px] leading-[130%] tracking-[0.02em] font-semibold py-[6px] w-full sm:px-[48px] sm:py-[12px] sm:w-fit cursor-pointer">{content}</button>
            )}
        </>
    )
}

export default Button