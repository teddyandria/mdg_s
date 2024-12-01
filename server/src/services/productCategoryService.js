// const {ProductCategory} = require('../models');
//
// const categoryService = {
//     initializeCategories: async () => {
//         const categories = [
//             { name: 'Textiles & Tissus'},
//             { name: 'Objets en bois'},
//             { name: 'Accessoires'},
//             { name: 'Produits de bien être'},
//         ];
//
//         const existingCategories = await ProductCategory.findAll({
//             attributes: ['name'],
//             raw: true
//         });
//
//         const existingCategoryNames = existingCategories.map(cat => cat.name);
//
//         for (const category of categories) {
//             if (!existingCategoryNames.includes(category.name)) {
//                 const newCategory = await ProductCategory.create(category);
//                 console.log(`Category ${newCategory.name} created.`);
//             } else {
//                 console.log(`Category ${category.name} already exists.`);
//             }
//         }
//     }
// };
//
// module.exports = categoryService;