"use client ";

import {Modal} from "./Modal";

import Image from "next/image";

interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  src,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image
          alt="image"
          className="object-cover"
          fill
          src={src || "/images/placeholder.jpg"}
        />
      </div>
    </Modal>
  );
};
