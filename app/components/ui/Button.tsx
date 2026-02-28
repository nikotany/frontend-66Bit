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
                <button onClick={onClick} className={`flex gap-3 items-center cursor-pointer ${className}`}>
                    {content}
                    {image}    
                </button>
            ) : (
                <button onClick={onClick} className="bg-[#155DA4] text-[#FFFFFF] text-[16px] rounded-lg leading-[130%] tracking-[0.02em] px-12 py-3 cursor-pointer">{content}</button>
            )}
        </>
    )
}

export default Button