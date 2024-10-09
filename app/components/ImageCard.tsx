
import Image from "next/image";

interface IImageCardProps {
    id: string;
    imageUrl: string;
    altDescription: string;

}

const ImageCard = ({ id, imageUrl, altDescription }: IImageCardProps) => {
    return (
        <div key={id} className="mb-4">
            <Image
                src={imageUrl}
                alt={altDescription}
                width={300}
                height={300}
                className="border rounded-xl w-full"
            />
        </div>
    );
};

export default ImageCard;
