const ProductModel = require('../models/ProductModel');
const ProductCategoryModel = require('../models/ProductCategoryModel');

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
    findOne: async (productId) => {
        try {

            return await ProductModel.findOne({
                where: {id: productId},
                include: [
                    {
                        model: ProductCategoryModel,
                        as: 'category',
                        attributes: ['name'],
                    },
                ],
            });
        } catch (error) {
            console.error('Erreur lors de la récupération du produit :', error);
            throw new Error('Erreur lors de la récupération du produit.');
        }
    },
    getCategories: async () => {
        return await ProductCategoryModel.findAll({
            attributes: ["id", "name"],
        });
    },
    getProductsByCategoryId: async (categoryId) => {
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

    findCategoryByName: async (categoryName) => {
        return await ProductCategoryModel.findOne({ where: { name: categoryName.trim() }, });
    },
};

module.exports = productService;
