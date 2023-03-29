// demo
type Product = {
  id: number,
  name: string,
  image: string,
  details?: string
};

const products: Product[] = [
  {
    id: 1,
    name: 'The Starry Night',
    image: 'starrynight.jpg',
    details: "Van Gogh'un 1899 yılında, akıl hastanesinde kaldığı sırada yaptığı ünlü bir resim."
  },
  {
    id: 2,
    name: 'Macbook Pro M2',
    image: 'macbook.jpg',
    details: 'Yeni bir Apple dizüstü bilgisayar modeli.'
  },
  {
    id: 3,
    name: 'Omitrix',
    image: 'omitrix.jpg',
    details: 'DNA kodlaması sayesinde kullanıcısının farklı yaratıklara dönüşmesine olanak tanıyan akıllı saat benzeri bir cihaz.'
  }
];

export default products;
