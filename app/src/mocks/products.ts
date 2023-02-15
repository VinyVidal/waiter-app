import { Product } from "../types/Product";

export const products: Product[] = [
  {
    _id: '6372e040f52e37ef85fe2c5e',
    name: 'Pizza quatro queijos',
    description: 'Deliciosa pizza quatro queijos com borda simples',
    imagePath: '1670174649157-quatro-queijos.png',
    price: 40,
    ingredients: [
      {
        name: 'Mussarela',
        icon: '🧀',
        _id: '6372e040f52e37ef85fe2c5f'
      },
      {
        name: 'Parmesão',
        icon: '🧀',
        _id: '6372e040f52e37ef85fe2c60'
      },
      {
        name: 'Gouda',
        icon: '🧀',
        _id: '6372e040f52e37ef85fe2c61'
      },
      {
        name: 'Brie',
        icon: '🧀',
        _id: '6372e040f52e37ef85fe2c62'
      }
    ],
  },
  {
    _id: '6372e276a381106c0f854cb3',
    name: 'Coca cola',
    description: 'Coca cola lata geladinha topzera',
    imagePath: '1670175411000-coca-cola.png',
    price: 7,
    ingredients: [],
  },
  {
    _id: '6372e276a381106c0f85as4cb3',
    name: 'Coca cola 1',
    description: 'Coca cola lata geladinha topzera',
    imagePath: '1670175411000-coca-cola.png',
    price: 7,
    ingredients: [],
  },
  {
    _id: '6372e276a381106c34854cb3',
    name: 'Coca cola 2',
    description: 'Coca cola lata geladinha topzera',
    imagePath: '1670175411000-coca-cola.png',
    price: 7,
    ingredients: [],
  },
  {
    _id: '6372e276a385406c0f854cb3',
    name: 'Coca cola 3',
    description: 'Coca cola lata geladinha topzera',
    imagePath: '1670175411000-coca-cola.png',
    price: 7,
    ingredients: [],
  },
];
