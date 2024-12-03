// services/categoryService.js
const { ProductCategory } = require('../models');

const categoryService = {
    initializeCategories: async () => {
        const categories = [
            { name: 'Textiles & Tissus' },
            { name: 'Objets en bois' },
            { name: 'Accessoires' },
            { name: 'Produits de bien-être' },
        ];

        try {
            // vérifie si des catégories existent déjà
            const existingCategories = await ProductCategory.findAll({
                attributes: ['name'],
                raw: true,
            });

            const existingCategoryNames = existingCategories.map(cat => cat.name);

            for (const category of categories) {
                if (!existingCategoryNames.includes(category.name)) {
                    const newCategory = await ProductCategory.create(category);
                    console.log(`Catégorie ${newCategory.name} créée.`);
                } else {
                    console.log(`Catégorie ${category.name} déjà existante.`);
                }
            }
        } catch (error) {
            console.error('Erreur lors de l\'initialisation des catégories :', error);
        }
    }
};

module.exports = categoryService;
