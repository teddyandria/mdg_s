const ProductModel = require('../models/ProductModel.entity');
const ProductCategoryModel = require('../models/ProductCategoryModel.entity');

const productService = {

    createProduct: async (data) => {
        try {
            return await ProductModel.create(data);
        } catch (error) {
            throw new Error('Erreur lors de la création du produit.');
        }
    },

    getAllProducts: async () => {
        try {
            return await ProductModel.findAll({
                include: [{
                    model: ProductCategoryModel,
                    as: 'category',
                    attributes: ['id', 'name'],
                }],
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            throw new Error('Impossible de récupérer les produits');
        }
    },

    deleteProduct: async (id) => {
        try {
            const result = await ProductModel.destroy({ where: { id } });
            if (!result) {
                return result;
            } else {
                throw new Error('Produit introuvable.');
            }
        } catch (error) {
            throw new Error('Erreur lors de la suppression du produit.');
        }
    },
    findOneProduct: async (productId) => {
        try {
            return await ProductModel.findOne({
                where: { id: productId },
                include: [{
                    model: ProductCategoryModel,
                    as: 'category',
                    attributes: ['name'],
                }],
            });
        } catch (error) {
            console.error('Erreur lors de la récupération du produit :', error);
            throw new Error('Erreur lors de la récupération du produit.');
        }
    },

    findCategoryByName: async (categoryName) => {
        try {
            return await ProductCategoryModel.findOne({
                where: { name: categoryName },
            });
        } catch (error) {
            console.error('Erreur lors de la recherche de la catégorie :', error);
            throw new Error('Erreur lors de la recherche de la catégorie.');
        }
    },

    getCategories: async () => {
        try {
            return await ProductCategoryModel.findAll({
                attributes: ["id", "name"],
            });
        } catch (error) {
            console.error("Erreur lors du findAll Sequelize :", error);
            throw new Error('Impossible de récupérer les catégories.');
        }
    },
    getProductsByCategory: async (categoryId) => {
        if (!categoryId) {
            throw new Error('Category ID manquant');
        }

        return await ProductModel.findAll({
            where: { categoryId },
            attributes: ['id', 'name', 'description', 'price', 'stock', 'photos'],
            include: [
                {
                    model: ProductCategoryModel,
                    as: 'category',
                    attributes: ['name'],
                },
            ],
        });
    },

};

module.exports = productService;
