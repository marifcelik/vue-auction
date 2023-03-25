// demo
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

type Product = {
  name: string,
  price: number,
  image: string,
  details?: string
};

function image(name: string) {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  return join(__dirname, '../../public', name)
}

const products: Product[] = [
  {
    name: 'the starry night',
    price: 10000,
    image: image('prod1.webp'),
    details: 'tablo'
  },
  {
    name: 'macbook pro m2',
    price: 2000,
    image: image('macbook.jpg')
  },
  {
    name: 'omitrix',
    price: 6000,
    image: image('omitrix.webp')
  }
];

export default products;
