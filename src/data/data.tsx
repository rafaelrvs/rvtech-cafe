interface Cafe {
  img: string;
  nome: string;
  preco: number; // Armazenado como número para facilitar cálculos
  detalhes: string;
}

export const dataCafe: Cafe[] = [
  {
    img: "/src/assets/cardCafe.svg",
    nome: "Café Preto",
    preco: 12.2, // Preço formatado como número
    detalhes: "Um café preto clássico.",
  },
  {
    img: "/src/assets/cardCafe.svg",
    nome: "Latte",
    preco: 15.5,
    detalhes: "Café com leite vaporizado.",
  },
  {
    img: "/src/assets/cardCafe.svg",
    nome: "Cappuccino",
    preco: 16.0,
    detalhes: "Café com leite e espuma cremosa.",
  },
  {
    img: "/src/assets/cardCafe.svg",
    nome: "Espresso",
    preco: 10.0,
    detalhes: "Um espresso forte e aromático.",
  },
  {
    img: "/src/assets/cardCafe.svg",
    nome: "Macchiato",
    preco: 14.5,
    detalhes: "Espresso com uma pequena quantidade de espuma de leite.",
  },
];
  