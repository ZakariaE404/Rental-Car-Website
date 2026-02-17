
export interface Vehicle {
    id: number;
    name: string;
    price: number;
    category: string;
    isAuto: boolean;
    year: string;
    fuel: string;
    places: string;
    image: string;
}

export const vehicles: Vehicle[] = [
    { id: 1, name: "Dacia Logan", price: 250, category: "Berlines", isAuto: false, year: "2022/2025", fuel: "Diesel", places: "5 Places", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Hyundai Accent", price: 250, category: "Berlines", isAuto: false, year: "2023/2025", fuel: "Diesel", places: "5 Places", image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Hyundai Tucson", price: 550, category: "SUV", isAuto: true, year: "2025", fuel: "Diesel", places: "5 Places", image: "/assets/Hyundai New Tucson.jpg" },
    { id: 4, name: "kia picanto", price: 250, category: "Citadines", isAuto: true, year: "2022/2025", fuel: "Diesel", places: "5 Places", image: "/assets/Ouv-kia.webp" },
    { id: 5, name: "Ronault clio v", price: 300, category: "Citadines", isAuto: false, year: "2023/2025", fuel: "Diesel", places: "5 Places", image: "/assets/renault-clio-5.jpg" },
    { id: 6, name: "Peugeot 208", price: 300, category: "Citadines", isAuto: false, year: "2023/2025", fuel: "Diesel", places: "5 Places", image: "/assets/p208.webp" },
    { id: 7, name: "Dacia Sandero Stepway", price: 250, category: "Citadines", isAuto: false, year: "2023/2025", fuel: "Diesel", places: "5 Places", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop" },
    { id: 8, name: "Hyundai i20", price: 250, category: "Citadines", isAuto: true, year: "2023/2025", fuel: "Essence", places: "5 Places", image: "/assets/hyundai-i20.webp" },
    { id: 9, name: "Volkswagen Golf 8", price: 550, category: "Berlines", isAuto: true, year: "2025", fuel: "Diesel", places: "5 Places", image: "/assets/Volkswagen-Golf.jpg" },
];
