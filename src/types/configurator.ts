export interface Option {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export interface OptionGroup {
  id: string;
  title: string;
  options: Option[];
  required?: boolean;
  dependsOn?: string[]; // IDs of groups that must be selected first
  description?: string;
  extras?: Option[];
}

export interface Step {
  id: string;
  title: string;
  groups: OptionGroup[];
}

export interface Selection {
  groupId: string;
  optionId: string;
  option: Option;
}

export interface ConfiguratorState {
  currentStep: number;
  selections: Selection[];
  totalPrice: number;
}

export const STEPS: Step[] = [
  {
    id: "seletor01",
    title: "Seletor 01",
    groups: [
      {
        id: "modulo-base",
        title: "MÓDULO BASE",
        required: true,
        options: [
          { id: "com-tampa", name: "Com Tampa", price: 9993.23, image: "/lovable-uploads/7c93c178-35c4-4357-bd73-2b3c6501865b.png" },
          { id: "sem-tampa", name: "Sem Tampa", price: 0, image: "/lovable-uploads/72028924-1cad-40a0-8b26-5a03d1edacbe.png" }
        ]
      },
      {
        id: "higienizacao",
        title: "HIGIENIZAÇÃO PREMIUM",
        required: true,
        dependsOn: ["modulo-base"],
        options: [
          { id: "com-mangueira", name: "Com Mangueira para Limpeza", price: 330.00, image: "/lovable-uploads/2dd7b8df-a231-4367-8ab8-cddd803fc8f8.png" },
          { id: "sem-mangueira", name: "Sem Mangueira para Limpeza", price: 0, image: "/lovable-uploads/6b7e9c77-7799-4747-b233-0c36edafd53d.png" }
        ]
      }
    ]
  },
  {
    id: "seletor02",
    title: "Seletor 02",
    groups: [
      {
        id: "revestimento",
        title: "REVESTIMENTO",
        required: true,
        options: [
          { id: "freijo-natural", name: "Concept Wall Kingspan Ribbon Freijó Natural", price: 3031.30, image: "/lovable-uploads/ef56d30d-cac1-4195-8d6d-2e7bf4933ec6.png" },
          { id: "preto-absoluto", name: "Concept Wall Kingspan Ribbon Preto Absoluto", price: 3031.30, image: "/lovable-uploads/b6018385-299c-4c05-b8c3-80657b929913.png" },
          { id: "lystra-freijo", name: "Concept Wall Kingspan Lystra Freijó Natural", price: 3835.10, image: "/lovable-uploads/ec812f5c-dd6d-45cc-a5f2-77cdd1eb6471.png" },
          { id: "lystra-preto", name: "Concept Wall Kingspan Lystra Preto Absoluto", price: 3835.10, image: "/lovable-uploads/ecc52f02-c0d6-4b9e-bba2-d479902337df.png" }
        ]
      },
      {
        id: "forro",
        title: "FORRO",
        required: true,
        dependsOn: ["revestimento"],
        options: [
          { id: "vinilic-amadeirado", name: "Forro Vinílico Amadeirado - Carvalho Tuari II", price: 1292.45, image: "/lovable-uploads/79603991-9b3f-4620-af8d-cec697cd7510.png" },
          { id: "vinilic-preto", name: "Forro Vinílico Preto", price: 1292.45, image: "/lovable-uploads/b49be888-aae6-4cf0-a686-2b90f66e410e.png" }
        ]
      }
    ]
  },
  {
    id: "seletor03",
    title: "Seletor 03 (Interior)",
    groups: [
      {
        id: "marcenaria",
        title: "MARCENARIA",
        required: true,
        options: [
          { id: "mdf-cinza", name: "MDF Cinza Cristal - Greenplac", price: 11583.66, image: "/lovable-uploads/693548ae-3ef2-4bab-8155-1d58230924b4.png" },
          { id: "mdf-cromato", name: "MDF Cromato - Greenplac", price: 10560.00, image: "/lovable-uploads/84fd62a7-80b1-4359-a456-1238cb96a92d.png" },
          { id: "mdf-carvalho", name: "MDF Carvalho Avelã - Duratex", price: 15380.20, image: "/lovable-uploads/dcaa6347-1a2d-43d9-969b-61576695085e.png" }
        ]
      },
      {
        id: "bancada",
        title: "BANCADA",
        description: "* Coifa inclusa",
        required: true,
        dependsOn: ["marcenaria"],
        options: [
          { id: "verde-ubatuba", name: "Granito Verde Ubatuba", price: 9083.25 },
          { id: "verde-ubatuba-escovado", name: "Granito Verde Ubatuba Escovado", price: 9677.25 },
          { id: "preto-sao-gabriel", name: "Granito Preto São Gabriel", price: 10667.25 },
          { id: "preto-sao-gabriel-escovado", name: "Granito Preto São Gabriel Escovado", price: 11261.25 },
          { id: "sienna", name: "Granito Sienna", price: 11657.25 },
          { id: "sienna-escovado", name: "Granito Sienna Escovado", price: 12251.25 },
          { id: "alaska", name: "Granito Alaska", price: 13241.25 },
          { id: "alaska-escovado", name: "Granito Alaska Escovado", price: 13835.25 },
          { id: "donatello", name: "Mármore Donatello", price: 19181.25 },
          { id: "donatello-escovado", name: "Mármore Donatello Escovado", price: 20171.25 },
          { id: "monte-cristo", name: "Mármore Monte Cristo", price: 19181.25 },
          { id: "monte-cristo-escovado", name: "Mármore Monte Cristo Escovado", price: 20171.25 },
          { id: "michelangelo", name: "Mármore Michelangelo Bordeaux", price: 26111.25, image: "/lovable-uploads/b3c99b00-795f-426b-a838-51a1baf3682c.png" },
          { id: "vitoria-regia", name: "Mármore Vitória Régia Escovado", price: 30071.25, image: "/lovable-uploads/b77d7a3a-3f27-4ac4-a228-fd21d3fccc24.png" }
        ]
      }
    ]
  },
  {
    id: "seletor04",
    title: "Seletor 04 (Acessórios)",
    groups: [
      {
        id: "setor01",
        title: "SETOR 01",
        description: "* Coifa inclusa",
        required: true,
        options: [
          { id: "parrileira-corse", name: "Parrileira com grelha angular e firebox - corse", price: 8096.55, description: "*inclui churrasqueira e base refratário", image: "/lovable-uploads/9091a63a-1d11-4a53-a1f3-5533a14c7cd6.png" },
          { id: "churrasqueira-future", name: "Churrasqueira future 9 espetos (60x53x12)", price: 6908.55, description: "*inclui churrasqueira e base refratário", image: "/lovable-uploads/e34e54cb-88e7-4915-b13c-de9a4d5fb081.png" },
          { id: "churrasqueira-lift", name: "Churrasqueira lift grill future 9 espetos (60x53x12) com automatização", price: 11124.30, description: "*inclui churrasqueira e base refratário", image: "/lovable-uploads/e34e54cb-88e7-4915-b13c-de9a4d5fb081.png" },
          { id: "churrasqueira-pro", name: "Churrasqueira pró S 3Q de embutir - char broil", price: 11545.05, image: "/lovable-uploads/2486f5b6-9e16-42ae-bf07-09fd3f803a14.png" }
        ]
      },
      {
        id: "setor02",
        title: "SETOR 02",
        required: true,
        dependsOn: ["setor01"],
        options: [
          { id: "parrileira-corse-s2", name: "Parrileira com grelha angular e firebox - corse", price: 8096.55, image: "/lovable-uploads/65bdc104-6561-4a7b-8e31-c691505bf0ad.png" },
          { id: "churrasqueira-pro-s2", name: "Churrasqueira pró S 3Q de embutir - char broil", price: 11545.05, image: "/lovable-uploads/a3fe3e15-48ac-4204-be67-f9ecaaa2a82f.png" },
          { id: "cooktop-inducao", name: "Cooktop de indução - EOS", price: 2623.50, image: "/lovable-uploads/a2d559a8-2443-4da6-abb2-6d4992f7233d.png" },
          { id: "cooktop-forno", name: "Cooktop de indução e forno elétrico - EOS", price: 4455.00, image: "/lovable-uploads/c6baf3c9-3edc-453d-8cb8-75c223ed47e1.png" },
          { id: "vazio-s2", name: "Vazio (completa com marcenaria)", price: 0, image: "/lovable-uploads/b5abdda2-b490-465a-ae56-0c619187046e.png" }
        ],
        extras: [
          { id: "coifa-simples", name: "Coifa simples (já incluso no módulo)", price: 0, image: "/lovable-uploads/67524df0-e291-424a-93e1-58b41394d7ea.png" },
          { id: "coifa-dupla", name: "Coifa dupla", price: 1419.00, image: "/lovable-uploads/a2d559a8-2443-4da6-abb2-6d4992f7233d.png" }
        ]
      },
      {
        id: "setor03",
        title: "SETOR 03",
        required: true,
        dependsOn: ["setor02"],
        options: [
          { id: "calha-p", name: "Calha úmida P (83,5cm)", price: 2271.54, image: "/lovable-uploads/e9b50bce-97ca-471f-b441-ecfa0af92c4a.png" },
          { id: "calha-m", name: "Calha úmida M (167cm)", price: 3548.23, image: "/lovable-uploads/b61ec615-83dd-4de6-be5f-dda81543c49f.png" },
          { id: "calha-g", name: "Calha úmida G (250cm)", price: 4824.91, image: "/lovable-uploads/999d3999-3a78-4ffa-ae38-a9a2c7ab1a37.png" },
          { id: "sem-calha", name: "Sem calha úmida", price: 0 }
        ],
        extras: [
          { id: "tv-42", name: "TV 42 polegadas", price: 3182.85, image: "/lovable-uploads/e8524fd1-efe9-4546-9e78-57e832dce55e.png" },
          { id: "tv-42-som", name: "TV 42 polegadas com caixa de som embutida teto", price: 4139.85, image: "/lovable-uploads/e8524fd1-efe9-4546-9e78-57e832dce55e.png" },
          { id: "sem-tv", name: "Sem TV", price: 0, image: "/lovable-uploads/aebe0727-e231-4696-b32e-ff8dd70e5477.png" }
        ]
      },
      {
        id: "setor04",
        title: "SETOR 04",
        required: true,
        dependsOn: ["setor03"],
        options: [
          { id: "chopeira", name: "Chopeira modelo naja 2 vias kit completo", price: 23100.00, image: "/lovable-uploads/14efee8a-bbb1-402e-a330-d323265be33d.png" },
          { id: "maquina-gelo", name: "Máquina de gelo 45kg - EOS", price: 5113.35, image: "/lovable-uploads/79e8334d-0c44-4391-9ff6-e60d38b8d2f3.png" },
          { id: "lava-loucas", name: "Lava louças de embutir 14 serviços - benmax", price: 9388.50, image: "/lovable-uploads/da49c99a-d7ec-490a-8852-1da289b978b8.png" },
          { id: "adega-frigobar", name: "Adega / cervejeira / frigobar - midea", price: 3300.00 },
          { id: "vazio-s4", name: "Vazio (completa com marcenaria)", price: 0, image: "/lovable-uploads/3ce90e9d-4bde-42a9-bb21-c532f6b5889d.png" }
        ]
      },
      {
        id: "setor05",
        title: "SETOR 05",
        required: true,
        dependsOn: ["setor04"],
        options: [
          { id: "adega-midea", name: "Adega / cervejeira / frigobar - midea", price: 3300.00 },
          { id: "dois-frigobares", name: "Dois frigobares - midea", price: 6600.00 },
          { id: "cervejeira-vertical", name: "Cervejeira vertical - venax", price: 4950.00 },
          { id: "adega-bac51", name: "Adega BAC51 dual zone - benmax", price: 8893.63 },
          { id: "vazio-s5", name: "Vazio (completa com marcenaria)", price: 0 }
        ],
        extras: [
          { id: "armario-aereo", name: "Armário/adega aérea em serralheria", price: 990.00 },
          { id: "sem-armario", name: "Sem armário aéreo", price: 0 }
        ]
      }
    ]
  }
];
