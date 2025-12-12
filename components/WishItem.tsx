"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { FaTrash } from "react-icons/fa";
import { sanitize } from "@/lib/sanitize";

interface WishItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  stockAvailabillity: number;
}

const WishItem: React.FC<WishItemProps> = ({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
}) => {
  const { removeFromWishlist } = useWishlistStore();

  const handleRemove = () => {
    removeFromWishlist(id);
  };

  return (
    <tr>
      <td>
        <button
          onClick={handleRemove}
          className="btn btn-ghost btn-sm text-red-600 hover:text-red-800"
          aria-label="Remove from wishlist"
        >
          <FaTrash />
        </button>
      </td>
      <td>
        <Link href={`/products/${slug}`}>
          <div className="relative w-20 h-20 mx-auto">
            <Image
              src={image || "/placeholder-product.png"}
              alt={sanitize(title)}
              fill
              className="object-cover rounded"
            />
          </div>
        </Link>
      </td>
      <td>
        <Link href={`/products/${slug}`} className="hover:text-primary">
          {sanitize(title)}
        </Link>
      </td>
      <td>
        {stockAvailabillity > 0 ? (
          <span className="text-green-600 font-semibold">In Stock</span>
        ) : (
          <span className="text-red-600 font-semibold">Out of Stock</span>
        )}
      </td>
      <td>
        <Link
          href={`/products/${slug}`}
          className="btn btn-primary btn-sm"
        >
          View Product
        </Link>
      </td>
    </tr>
  );
};

export default WishItem;
