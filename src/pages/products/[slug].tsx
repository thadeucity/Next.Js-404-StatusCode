import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

interface FullProductProps {
  productData: {
    title: string;
    price: number;
  };
}

const FullArticle: React.FC<FullProductProps> = ({ productData }) => {
  return (
    <div>
      <h1>{productData.title}</h1>
      <h2>U$ {productData.price.toFixed(2)}</h2>
    </div>
  );
};

export default FullArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<FullProductProps> = async (
  context
) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3333/products?slug=${slug}`);

  const products = await response.json();

  const selectedProduct = products[0];

  const notFound = !selectedProduct;

  return {
    props: {
      productData: selectedProduct,
    },
    revalidate: 300,
    notFound,
  };
};
