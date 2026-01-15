import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// Spanish translations for recipes
const recipeTranslations: Record<string, {
    title_es: string;
    description_es: string;
    category_es: string;
    ingredients_text_es: string[];
    instructions_es: string[];
}> = {
    "Rollitos Índicos de Gambas con Salsa de Mango": {
        title_es: "Rollitos Índicos de Gambas con Salsa de Mango",
        description_es: "Rollitos crujientes de gambas con salsa de mango dulce y picante, infusionados con aceite de THC.",
        category_es: "Aperitivo",
        ingredients_text_es: [
            "1 Mango, pelado y cortado en cubos",
            "1 Diente de Ajo, finamente picado",
            "1 cucharada de Azúcar",
            "1 cucharada de Jengibre, picado grueso",
            "1/2 Pimiento Habanero pequeño, sin semillas y picado",
            "1/4 Taza de Jugo de Naranja",
            "2 cucharadas de Vinagre de Arroz",
            "1 cucharadita de Aceite de THC (para la salsa)",
            "1/2 Taza + 3 cucharadas de Aceite de THC (para freír/cocinar)",
            "1/4 Taza de Champiñones Shiitake, en rodajas",
            "1 cucharadita + 2 cucharadas de Salsa de Soja",
            "1 cucharadita de Aceite de Sésamo",
            "1 cucharada de Ajo, picado",
            "1 cucharada de Chalota, picada",
            "1/3 Taza de Zanahorias, en juliana",
            "1/3 Taza de Pimientos Rojos y Amarillos, en juliana",
            "1/2 Repollo Napa, rallado",
            "2 cucharadas de Pasta de Chile Asiática",
            "2 cucharaditas de Jugo de Lima",
            "2 cucharadas de Cebolletas, en rodajas",
            "1 cucharada de Jengibre, picado",
            "2 cucharadas de Cilantro, picado",
            "1 lb de Gambas de Roca, limpias",
            "12 oz de Hojas para Rollitos de Primavera",
            "1 Huevo, batido",
            "1/2 Taza de Maicena"
        ],
        instructions_es: [
            "1. Hacer la Salsa: Licuar mango, ajo, azúcar, 1 cucharada de jengibre, habanero, jugo de naranja, vinagre y 1 cucharadita de Aceite de THC hasta que esté suave.",
            "2. Preparar el Relleno: Calentar 1 cucharada de Aceite de THC. Saltear champiñones, salsa de soja, aceite de sésamo, ajo picado, chalota, zanahorias, pimientos, repollo, pasta de chile, jugo de lima, cebolletas, jengibre y cilantro. Enfriar.",
            "3. Preparar las Gambas: Cubrir las gambas con maicena. Freír en aceite hasta que estén cocidas. Picar y mezclar con el relleno.",
            "4. Armar: Colocar el relleno en las hojas, pincelar los bordes con huevo y enrollar firmemente.",
            "5. Freír: Freír los rollitos en el aceite restante hasta que estén dorados. Servir con salsa de mango."
        ]
    },
    "Cannabis Infused Chicken Wings": {
        title_es: "Alitas de Pollo Infusionadas con Cannabis",
        description_es: "Alitas pegajosas, sabrosas y potentes con un glaseado de cacahuete inspirado en Tailandia.",
        category_es: "Pollo",
        ingredients_text_es: [
            "2 lbs de Alitas de Pollo",
            "1 cucharada de Aceite Vegetal",
            "1 cucharada de Polvo de Hornear",
            "1/4 cucharadita de Sal",
            "1/4 cucharadita de Lecitina de Girasol",
            "1/3 Taza de Salsa de Chile Dulce",
            "2 cucharadas de Mantequilla de Cacahuete Cremosa",
            "2 cucharadas de Jugo de Lima",
            "1/2 cucharada de Salsa de Pescado",
            "1 cucharada de Sriracha",
            "Aceite de Semilla de Uva Infusionado con Cannabis",
            "Cacahuetes Triturados (Guarnición)",
            "Cilantro (Guarnición)"
        ],
        instructions_es: [
            "Paso 1: Secar y Refrigerar. Enjuagar las alitas y secar. Espolvorear con sal y polvo de hornear. Refrigerar durante la noche o al menos 3 horas.",
            "Paso 2: Hornear las Alitas. Mezclar las alitas con 1 cucharada de aceite vegetal. Hornear a 180°C (350°F) en una rejilla durante 45-50 minutos.",
            "Paso 3: Hacer la Salsa. En una cacerola, mezclar salsa de chile dulce, mantequilla de cacahuete, jugo de lima, salsa de pescado y sriracha. Batir con batidor metálico.",
            "Paso 4: Agregar Infusión. Apagar el fuego. Agregar Aceite de Semilla de Uva Infusionado con Cannabis y lecitina de girasol. Batir bien para emulsionar.",
            "Paso 5: Cubrir y Terminar. Cubrir las alitas con la mitad de la salsa. Hornear 3-5 mins. Repetir si se desea.",
            "Paso 6: Decorar. Cubrir con cacahuetes triturados y cilantro."
        ]
    },
    "Rasta Pasta": {
        title_es: "Pasta Rasta",
        description_es: "Una pasta colorida inspirada en Jamaica con condimento jerk y una cremosa salsa de leche de coco con cannabis.",
        category_es: "Pasta",
        ingredients_text_es: [
            "12 oz de Pasta Penne",
            "1 de cada Pimiento Rojo, Verde y Amarillo, en rodajas",
            "2 cucharadas de Condimento Jerk",
            "1 Taza de Crema Espesa",
            "1/2 Taza de Aceite de Coco Infusionado con Cannabis",
            "3 Cebolletas, picadas",
            "1/2 Taza de Queso Parmesano"
        ],
        instructions_es: [
            "1. Cocinar el penne según las instrucciones del paquete.",
            "2. En una sartén grande, derretir el Aceite de Coco con Cannabis a fuego medio. Saltear los pimientos hasta que estén tiernos.",
            "3. Incorporar el condimento jerk, luego agregar la crema espesa. Llevar a fuego lento.",
            "4. Agregar la pasta cocida y el queso parmesano a la sartén. Mezclar hasta que la salsa espese y cubra la pasta.",
            "5. Decorar con cebolletas y servir caliente."
        ]
    },
    "Canna-Linguini": {
        title_es: "Canna-Linguini",
        description_es: "Un linguini simple pero elegante mezclado en una salsa de mantequilla de cannabis con limón y ajo.",
        category_es: "Pasta",
        ingredients_text_es: [
            "12 oz de Linguini",
            "4 Dientes de Ajo, picados",
            "1/4 Taza de Mantequilla Infusionada con Cannabis",
            "1/4 Taza de Aceite de Oliva Extra Virgen",
            "1 Limón, rallado y exprimido",
            "1/4 cucharadita de Hojuelas de Pimiento Rojo",
            "1/4 Taza de Perejil Fresco, picado"
        ],
        instructions_es: [
            "1. Hervir el linguini en agua salada hasta que esté al dente.",
            "2. En una sartén, combinar aceite de oliva y Mantequilla Infusionada con Cannabis a fuego medio-bajo.",
            "3. Saltear el ajo y las hojuelas de pimiento rojo durante 1-2 minutos (no quemar el ajo).",
            "4. Agregar el jugo y la ralladura de limón. Mezclar con el linguini cocido.",
            "5. Retirar del fuego, incorporar el perejil y servir inmediatamente."
        ]
    },
    "Pumpkin Cream": {
        title_es: "Crema de Calabaza",
        description_es: "Sopa de calabaza aterciopelada infusionada con aceite de THC para una experiencia cálida y relajante.",
        category_es: "Cremas y Sopas",
        ingredients_text_es: [
            "2 Tazas de Puré de Calabaza",
            "1 Cebolla, cortada en cubos",
            "2 Tazas de Caldo de Verduras",
            "1/2 Taza de Crema Espesa",
            "1 cucharada de Aceite de THC",
            "1/2 cucharadita de Nuez Moscada",
            "Sal y Pimienta al gusto"
        ],
        instructions_es: [
            "1. Saltear las cebollas en una olla hasta que estén translúcidas.",
            "2. Incorporar el puré de calabaza, caldo de verduras y nuez moscada. Llevar a ebullición, luego cocinar a fuego lento durante 15 minutos.",
            "3. Usar una batidora de inmersión para suavizar la sopa.",
            "4. Incorporar la crema espesa y el Aceite de THC. No dejar hervir después de agregar el aceite de THC.",
            "5. Sazonar y servir con un remolino de crema encima."
        ]
    },
    "Chickpeas Cream with Bacon": {
        title_es: "Crema de Garbanzos con Bacon",
        description_es: "Puré abundante de garbanzos cubierto con bacon crujiente e infusionado con aceite de cannabis.",
        category_es: "Cremas y Sopas",
        ingredients_text_es: [
            "2 Latas (15oz) de Garbanzos, escurridos",
            "4 Rebanadas de Bacon, picado",
            "1 Cebolla, picada",
            "2 Dientes de Ajo",
            "3 Tazas de Caldo de Pollo",
            "1 cucharada de Aceite Infusionado con Cannabis",
            "1 cucharadita de Comino"
        ],
        instructions_es: [
            "1. En una olla, freír el bacon hasta que esté crujiente. Retirar el bacon y reservar, manteniendo la grasa en la olla.",
            "2. Saltear la cebolla y el ajo en la grasa del bacon. Agregar comino y garbanzos.",
            "3. Agregar caldo de pollo y cocinar a fuego lento durante 20 minutos.",
            "4. Licuar la mezcla hasta que esté completamente suave.",
            "5. Incorporar el Aceite Infusionado con Cannabis y cubrir con los trozos de bacon crujiente antes de servir."
        ]
    },
    "Ceviche Tropical": {
        title_es: "Ceviche Tropical",
        description_es: "Pescado blanco fresco curado en jugo de limón y aceite cítrico-cannabis infusionado.",
        category_es: "Pescados y Mariscos",
        ingredients_text_es: [
            "1 lb de Pescado Blanco Fresco (Lubina o Tilapia), en cubos",
            "1/2 Taza de Jugo de Lima",
            "1/2 Cebolla Roja, en rodajas finas",
            "1/4 Taza de Cilantro, picado",
            "1 cucharadita de Aceite de Semilla de Uva Infusionado con Cannabis",
            "1 Camote, hervido y en rodajas",
            "1 Mazorca de Maíz, granos removidos"
        ],
        instructions_es: [
            "1. En un tazón de vidrio, combinar el pescado y el jugo de lima. Asegurar que el pescado esté sumergido. Refrigerar durante 15-20 minutos.",
            "2. Escurrir aproximadamente la mitad del jugo de lima.",
            "3. Agregar cebolla roja, cilantro y granos de maíz.",
            "4. Incorporar suavemente el Aceite de Semilla de Uva Infusionado con Cannabis.",
            "5. Servir frío en un plato con rodajas de camote al lado."
        ]
    },
    "Classic Pot Brownies": {
        title_es: "Brownies Clásicos de Marihuana",
        description_es: "Brownies de chocolate densos y ricos con un toque mágico. Un favorito clásico.",
        category_es: "Postre",
        ingredients_text_es: [
            "1/2 Taza de Mantequilla Infusionada con Cannabis, derretida",
            "1 Taza de Azúcar Blanca",
            "2 Huevos",
            "1 cucharadita de Extracto de Vainilla",
            "1/3 Taza de Cacao en Polvo Sin Azúcar",
            "1/2 Taza de Harina para Todo Uso",
            "1/4 cucharadita de Sal",
            "1/4 cucharadita de Polvo de Hornear"
        ],
        instructions_es: [
            "1. Precalentar el horno a 350°F (175°C). Engrasar y enharinar un molde cuadrado de 8 pulgadas.",
            "2. En un tazón grande, mezclar la mantequilla de cannabis derretida y el azúcar. Batir los huevos y la vainilla.",
            "3. En un tazón aparte, batir el cacao, la harina, la sal y el polvo de hornear. Incorporar a la mezcla húmeda.",
            "4. Verter la masa en el molde preparado.",
            "5. Hornear durante 25 a 30 minutos. No cocinar en exceso.",
            "6. Enfriar completamente antes de cortar en cuadrados."
        ]
    },
    "Creamy Canna-Pesto Pasta": {
        title_es: "Pasta Cremosa de Canna-Pesto",
        description_es: "Pesto fresco de albahaca con piñones y una potente infusión de aceite de oliva con cannabis.",
        category_es: "Pasta",
        ingredients_text_es: [
            "12 oz de Linguine o Espagueti",
            "2 Tazas de Hojas de Albahaca Fresca",
            "1/2 Taza de Queso Parmesano, rallado",
            "1/3 Taza de Piñones, tostados",
            "3 Dientes de Ajo",
            "1/4 Taza de Aceite de Oliva Infusionado con Cannabis",
            "1/4 Taza de Aceite de Oliva Extra Virgen",
            "1/2 cucharadita de Sal",
            "1/4 cucharadita de Pimienta Negra"
        ],
        instructions_es: [
            "1. Hervir la Pasta: Cocinar la pasta en agua salada según las instrucciones del paquete. Reservar 1/2 taza de agua de la pasta.",
            "2. Licuar el Pesto: En un procesador de alimentos, pulsar albahaca, ajo y piñones hasta que estén picados grueso.",
            "3. Emulsionar: Mientras se licua, agregar lentamente el Aceite de Oliva Extra Virgen y el Aceite de Oliva Infusionado con Cannabis.",
            "4. Combinar: Incorporar el queso parmesano, sal y pimienta.",
            "5. Mezclar: Mezclar el pesto con la pasta caliente, agregando agua reservada si es necesario para cremosidad. No hervir la salsa para preservar la potencia del THC."
        ]
    },
    "Honey-Glazed Salmon with Infused Butter": {
        title_es: "Salmón Glaseado con Miel y Mantequilla Infusionada",
        description_es: "Filete de salmón sellado en sartén terminado con un glaseado dulce de miel y mantequilla de cannabis.",
        category_es: "Pescados y Mariscos",
        ingredients_text_es: [
            "2 Filetes de Salmón (6 oz cada uno)",
            "2 cucharadas de Miel",
            "1 cucharada de Salsa de Soja",
            "1 cucharada de Jugo de Limón",
            "2 cucharadas de Mantequilla Infusionada con Cannabis",
            "1 cucharadita de Pimentón Ahumado",
            "1/2 cucharadita de Pimienta Negra",
            "1 cucharada de Aceite de Oliva (para sellar)"
        ],
        instructions_es: [
            "1. Sazonar: Secar el salmón y sazonar con sal, pimienta y pimentón ahumado.",
            "2. Sellar: Calentar aceite de oliva en una sartén a fuego medio-alto. Sellar el salmón con la piel hacia abajo durante 4-5 minutos. Voltear y cocinar 2 minutos más.",
            "3. Hacer el Glaseado: En un tazón pequeño, batir miel, salsa de soja y jugo de limón.",
            "4. Terminar: Bajar el fuego a bajo. Agregar la mezcla de miel y la Mantequilla Infusionada con Cannabis a la sartén. Rociar la mantequilla derretida y el glaseado sobre el salmón durante 1-2 minutos hasta que esté brillante.",
            "5. Servir: Emplatar inmediatamente, vertiendo cualquier salsa restante de la sartén sobre el pescado."
        ]
    },
    "Infused Guacamole": {
        title_es: "Guacamole Infusionado",
        description_es: "Guacamole fresco y picante infusionado con aceite de cannabis. Perfecto para compartir.",
        category_es: "Aperitivo",
        ingredients_text_es: [
            "3 Aguacates Maduros, pelados y sin hueso",
            "1 Lima, exprimida",
            "1 cucharadita de Sal",
            "1/2 Taza de Cebolla Picada",
            "3 cucharadas de Cilantro Fresco, picado",
            "2 Tomates, cortados en cubos",
            "1 cucharadita de Ajo Picado",
            "1 cucharada de Aceite Infusionado con Cannabis"
        ],
        instructions_es: [
            "En un tazón mediano, machacar los aguacates con jugo de lima y sal.",
            "Mezclar cebolla, cilantro, tomates y ajo.",
            "Incorporar el aceite infusionado con cannabis hasta que esté bien distribuido.",
            "Refrigerar durante 10 minutos para que los sabores se mezclen antes de servir."
        ]
    },
    "Cannabis Green Tea": {
        title_es: "Té Verde de Cannabis",
        description_es: "Un té caliente relajante infusionado con mantequilla o aceite de cannabis. Excelente para la relajación.",
        category_es: "Bebida",
        ingredients_text_es: [
            "1 Bolsita de Té Verde",
            "1 Taza de Agua Hirviendo",
            "1 cucharadita de Mantequilla o Aceite Infusionado con Cannabis",
            "1 cucharadita de Miel (opcional)",
            "Rodaja de limón (opcional)"
        ],
        instructions_es: [
            "Colocar la bolsita de té y la mantequilla/aceite de cannabis en una taza.",
            "Verter agua hirviendo sobre la bolsita de té y el aceite.",
            "Dejar reposar durante 3-5 minutos.",
            "Retirar la bolsita de té, revolver bien para ayudar a dispersar el aceite (o usar un poco de leche/crema para unir).",
            "Agregar miel y limón si se desea."
        ]
    },
    "Tropical Mango Canna-Salad": {
        title_es: "Ensalada Tropical de Mango con Cannabis",
        description_es: "Una ensalada de mango refrescante y vibrante con un aderezo picante de lima y miel infusionada con cannabis.",
        category_es: "Ensalada",
        ingredients_text_es: [
            "2 Mangos Maduros, en cubos",
            "1 Pimiento Rojo, finamente picado",
            "1/2 Cebolla Roja, en rodajas finas",
            "1/4 Taza de Cilantro Fresco, picado",
            "1 Jalapeño, sin semillas y picado",
            "2 cucharadas de Jugo de Lima",
            "1 cucharada de Miel Infusionada con Cannabis",
            "1 cucharada de Aceite de Oliva Extra Virgen"
        ],
        instructions_es: [
            "1. En un tazón grande, combinar los mangos en cubos, pimiento, cebolla roja, cilantro y jalapeño.",
            "2. En un frasco pequeño o tazón, batir el jugo de lima, la Miel Infusionada con Cannabis y el aceite de oliva hasta emulsionar.",
            "3. Verter el aderezo sobre la ensalada y mezclar suavemente para cubrir.",
            "4. Dejar reposar durante 5 minutos en el refrigerador antes de servir para que los sabores se mezclen."
        ]
    },
    "Infused Tuna, Egg & Asparagus Salad": {
        title_es: "Ensalada de Atún, Huevo y Espárragos Infusionada",
        description_es: "Una ensalada rica en proteínas con espárragos blanqueados, huevos duros y atún con una vinagreta de cannabis.",
        category_es: "Ensalada",
        ingredients_text_es: [
            "1 manojo de Espárragos, extremos recortados",
            "2 Huevos Grandes",
            "1 Lata (5oz) de Atún de Alta Calidad, escurrido",
            "1 Taza de Tomates Cherry, cortados por la mitad",
            "1 cucharada de Aceite de Oliva Infusionado con Cannabis",
            "1 cucharada de Mostaza Dijon",
            "1 cucharada de Vinagre de Sidra de Manzana",
            "Sal y Pimienta Negra al gusto"
        ],
        instructions_es: [
            "1. Blanquear Espárragos: Cocinar espárragos en agua hirviendo durante 3 minutos, luego sumergir inmediatamente en agua helada. Escurrir y secar.",
            "2. Hervir Huevos: Colocar huevos en agua hirviendo durante 9 minutos para un hervido duro. Pelar y cortar en cuartos.",
            "3. Hacer Vinagreta: Batir el Aceite de Oliva Infusionado con Cannabis, mostaza Dijon y vinagre hasta que esté suave. Sazonar con sal y pimienta.",
            "4. Armar: Colocar los espárragos en una fuente. Cubrir con atún desmenuzado, tomates cherry y cuartos de huevo.",
            "5. Terminar: Rociar la vinagreta de cannabis por encima justo antes de servir."
        ]
    }
};

// Spanish translations for ingredients
const ingredientTranslations: Record<string, {
    name_es: string;
    description_es: string;
    category_es: string;
}> = {
    "THC Oil": { name_es: "Aceite de THC", description_es: "Aceite potente infusionado con cannabis para cocinar.", category_es: "Aceite" },
    "Mango": { name_es: "Mango", description_es: "Mango maduro y dulce.", category_es: "Fruta" },
    "Rock Shrimp": { name_es: "Gambas de Roca", description_es: "Gambas de roca frescas.", category_es: "Mariscos" },
    "Chicken Wings": { name_es: "Alitas de Pollo", description_es: "Alitas de pollo frescas.", category_es: "Carne" },
    "Vegetable Oil": { name_es: "Aceite Vegetal", description_es: "Aceite de cocina estándar.", category_es: "Aceite" },
    "Baking Powder": { name_es: "Polvo de Hornear", description_es: "Agente leudante.", category_es: "Repostería" },
    "Salt": { name_es: "Sal", description_es: "Sal de mesa.", category_es: "Condimento" },
    "Sunflower Lecithin": { name_es: "Lecitina de Girasol", description_es: "Emulsionante para ayudar a unir el THC.", category_es: "Suplemento" },
    "Sweet Chili Sauce": { name_es: "Salsa de Chile Dulce", description_es: "Salsa dulce y picante.", category_es: "Condimento" },
    "Creamy Peanut Butter": { name_es: "Mantequilla de Cacahuete Cremosa", description_es: "Mantequilla de cacahuete suave.", category_es: "Condimento" },
    "Lime Juice": { name_es: "Jugo de Lima", description_es: "Jugo de lima recién exprimido.", category_es: "Fruta" },
    "Fish Sauce": { name_es: "Salsa de Pescado", description_es: "Salsa de pescado fermentado sabrosa.", category_es: "Condimento" },
    "Sriracha": { name_es: "Sriracha", description_es: "Salsa de chile picante.", category_es: "Condimento" },
    "Cannabis Infused Grapeseed Oil": { name_es: "Aceite de Semilla de Uva Infusionado con Cannabis", description_es: "Aceite infusionado para cocinar.", category_es: "Aceite" },
    "Crushed Peanuts": { name_es: "Cacahuetes Triturados", description_es: "Cacahuetes triturados para decorar.", category_es: "Fruto Seco" },
    "Cilantro": { name_es: "Cilantro", description_es: "Hojas de cilantro fresco.", category_es: "Hierba" },
    "Garlic": { name_es: "Ajo", description_es: "Bulbo aromático picante usado como base de sabor.", category_es: "Verdura" },
    "Sugar": { name_es: "Azúcar", description_es: "Sacarosa cristalina dulce.", category_es: "Repostería" },
    "Ginger": { name_es: "Jengibre", description_es: "Raíz picante y aromática con sabor intenso.", category_es: "Verdura" },
    "Habanero Pepper": { name_es: "Pimiento Habanero", description_es: "Pimiento chile intensamente picante.", category_es: "Verdura" },
    "Orange Juice": { name_es: "Jugo de Naranja", description_es: "Jugo recién exprimido de naranjas.", category_es: "Bebida" },
    "Rice Wine Vinegar": { name_es: "Vinagre de Arroz", description_es: "Vinagre suave y ligeramente dulce.", category_es: "Condimento" },
    "Shiitake Mushrooms": { name_es: "Champiñones Shiitake", description_es: "Champiñones sabrosos y carnosos.", category_es: "Verdura" },
    "Soy Sauce": { name_es: "Salsa de Soja", description_es: "Condimento líquido salado hecho de soja fermentada.", category_es: "Condimento" },
    "Sesame Oil": { name_es: "Aceite de Sésamo", description_es: "Aceite rico y con sabor a nuez derivado de semillas de sésamo.", category_es: "Aceite" },
    "Shallot": { name_es: "Chalota", description_es: "Bulbo pequeño parecido a una cebolla con sabor más suave.", category_es: "Verdura" },
    "Carrots": { name_es: "Zanahorias", description_es: "Verdura de raíz crujiente y dulce.", category_es: "Verdura" },
    "Red and Yellow Bell Peppers": { name_es: "Pimientos Rojos y Amarillos", description_es: "Pimientos dulces y crujientes en colores vibrantes.", category_es: "Verdura" },
    "Napa Cabbage": { name_es: "Repollo Napa", description_es: "Repollo chino tierno con sabor suave.", category_es: "Verdura" },
    "Asian Chili Paste": { name_es: "Pasta de Chile Asiática", description_es: "Pasta picante hecha de pimientos chile.", category_es: "Condimento" },
    "Green Onions": { name_es: "Cebolletas", description_es: "Cebollas frescas con tallos verdes y bulbos blancos.", category_es: "Verdura" },
    "Spring Roll Wrappers": { name_es: "Hojas para Rollitos de Primavera", description_es: "Hojas finas de masa.", category_es: "Despensa" },
    "Egg": { name_es: "Huevo", description_es: "Huevo fresco de gallina.", category_es: "Lácteo" },
    "Cornstarch": { name_es: "Maicena", description_es: "Polvo blanco fino usado como espesante.", category_es: "Despensa" },
    "Cannabis Infused Olive Oil": { name_es: "Aceite de Oliva Infusionado con Cannabis", description_es: "Aceite de oliva premium infusionado con cannabis descarboxilado.", category_es: "Aceite" },
    "Basil": { name_es: "Albahaca", description_es: "Hojas verdes de albahaca fresca y aromática.", category_es: "Hierba" },
    "Pine Nuts": { name_es: "Piñones", description_es: "Semillas comestibles pequeñas de las piñas femeninas de un pino.", category_es: "Fruto Seco" },
    "Parmesan Cheese": { name_es: "Queso Parmesano", description_es: "Queso italiano duro y sabroso.", category_es: "Lácteo" },
    "Salmon Fillet": { name_es: "Filete de Salmón", description_es: "Salmón fresco del Atlántico o Sockeye.", category_es: "Mariscos" },
    "Honey": { name_es: "Miel", description_es: "Jarabe dulce natural hecho por abejas.", category_es: "Condimento" },
    "Cannabis Infused Butter": { name_es: "Mantequilla Infusionada con Cannabis", description_es: "Mantequilla de alta calidad infusionada con THC.", category_es: "Lácteo" },
    "Smoked Paprika": { name_es: "Pimentón Ahumado", description_es: "Capsicum molido con sabor ahumado.", category_es: "Condimento" },
    "Penne Pasta": { name_es: "Pasta Penne", description_es: "Piezas de pasta en forma de cilindro.", category_es: "Repostería" },
    "Cannabis Infused Coconut Oil": { name_es: "Aceite de Coco Infusionado con Cannabis", description_es: "Aceite de coco infusionado con THC de alta calidad.", category_es: "Aceite" },
    "Jerk Seasoning": { name_es: "Condimento Jerk", description_es: "Mezcla de especias jamaicana picante.", category_es: "Condimento" },
    "Pumpkin Purée": { name_es: "Puré de Calabaza", description_es: "Calabaza cocida y machacada.", category_es: "Verdura" },
    "Chickpeas": { name_es: "Garbanzos", description_es: "Legumbres nutritivas también conocidas como frijoles garbanzo.", category_es: "Verdura" },
    "Bacon": { name_es: "Bacon", description_es: "Rebanadas de panceta de cerdo curada con sal.", category_es: "Carne" },
    "White Fish": { name_es: "Pescado Blanco", description_es: "Pescado fresco magro como lubina o tilapia.", category_es: "Mariscos" },
    "Sweet Potato": { name_es: "Camote", description_es: "Verdura de raíz almidonada y de sabor dulce.", category_es: "Verdura" },
    "Cannabis Infused Honey": { name_es: "Miel Infusionada con Cannabis", description_es: "Miel natural dulce infusionada con extracto de cannabis descarboxilado.", category_es: "Condimento" },
    "Jalapeño": { name_es: "Jalapeño", description_es: "Pimiento chile verde fresco con calor moderado.", category_es: "Verdura" },
    "Asparagus": { name_es: "Espárragos", description_es: "Tallos verdes tiernos, ricos en vitaminas.", category_es: "Verdura" },
    "Eggs": { name_es: "Huevos", description_es: "Huevos grandes frescos de granja.", category_es: "Lácteo" },
    "Tuna": { name_es: "Atún", description_es: "Atún enlatado o fresco listado/albacora.", category_es: "Mariscos" },
    "Dijon Mustard": { name_es: "Mostaza Dijon", description_es: "Mostaza francesa picante y ácida.", category_es: "Condimento" },
    "Red Onion": { name_es: "Cebolla Roja", description_es: "Cebolla de piel morada picante y crujiente.", category_es: "Verdura" }
};

// Category translations
const categoryTranslations: Record<string, string> = {
    "Appetizer": "Aperitivo",
    "Appetizers": "Aperitivos",
    "Chicken": "Pollo",
    "Pasta": "Pasta",
    "Creams and Soups": "Cremas y Sopas",
    "Fish and Seafood": "Pescados y Mariscos",
    "Dessert": "Postre",
    "Drink": "Bebida",
    "Salad": "Ensalada"
};

async function main() {
    try {
        const adminEmail = process.env.PB_ADMIN_EMAIL || 'test@example.com';
        const adminPassword = process.env.PB_ADMIN_PASSWORD || 'PASSWORD123456';

        console.log(`Authenticating as ${adminEmail}...`);
        await pb.admins.authWithPassword(adminEmail, adminPassword);

        // --- TRANSLATE RECIPES ---
        console.log('\nTranslating recipes...');
        const recipes = await pb.collection('recipes').getFullList();

        let recipesUpdated = 0;
        for (const recipe of recipes) {
            const translation = recipeTranslations[recipe.title];
            if (translation) {
                try {
                    // Translate category (handle both string and array)
                    let category_es = recipe.category;
                    if (Array.isArray(recipe.category)) {
                        category_es = recipe.category.map((cat: string) => categoryTranslations[cat] || cat).join(', ');
                    } else if (typeof recipe.category === 'string') {
                        category_es = categoryTranslations[recipe.category] || recipe.category;
                    }

                    await pb.collection('recipes').update(recipe.id, {
                        title_es: translation.title_es,
                        description_es: translation.description_es,
                        category_es: category_es,
                        ingredients_text_es: translation.ingredients_text_es,
                        instructions_es: translation.instructions_es
                    });
                    console.log(`✓ Translated recipe: ${recipe.title}`);
                    recipesUpdated++;
                } catch (error) {
                    console.error(`✗ Error translating recipe "${recipe.title}":`, error);
                }
            } else {
                console.log(`⚠ No translation found for recipe: ${recipe.title}`);
            }
        }

        // --- TRANSLATE INGREDIENTS ---
        console.log('\nTranslating ingredients...');
        const ingredients = await pb.collection('ingredients').getFullList();

        let ingredientsUpdated = 0;
        for (const ingredient of ingredients) {
            const translation = ingredientTranslations[ingredient.name];
            if (translation) {
                try {
                    await pb.collection('ingredients').update(ingredient.id, {
                        name_es: translation.name_es,
                        description_es: translation.description_es,
                        category_es: translation.category_es
                    });
                    console.log(`✓ Translated ingredient: ${ingredient.name}`);
                    ingredientsUpdated++;
                } catch (error) {
                    console.error(`✗ Error translating ingredient "${ingredient.name}":`, error);
                }
            } else {
                console.log(`⚠ No translation found for ingredient: ${ingredient.name}`);
            }
        }

        console.log(`\n✅ Translation completed!`);
        console.log(`   Recipes translated: ${recipesUpdated}/${recipes.length}`);
        console.log(`   Ingredients translated: ${ingredientsUpdated}/${ingredients.length}`);

    } catch (error) {
        console.error('❌ Error during translation:', error);
        process.exit(1);
    }
}

main();
