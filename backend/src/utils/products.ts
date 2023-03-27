// demo
type Product = {
  id: number,
  name: string,
  price: number,
  image: string,
  details?: string
};

const products: Product[] = [
  {
    id: 1,
    name: 'the starry night',
    price: 10000,
    image: 'prod1.webp',
    details: 'tablo'
  },
  {
    id: 2,
    name: 'macbook pro m2',
    price: 7000,
    image: 'macbook.jpg'
  },
  {
    id: 3,
    name: 'omitrix',
    price: 60000,
    image: 'omitrix.webp'
  }
];

export default products;
