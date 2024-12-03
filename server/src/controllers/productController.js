const productService = require('../services/productService');
const ProductCategory = require('../models/ProductCategoryModel');

const productController = {

    createProduct: async (req, res) => {
        try {
            // Vérifier si des fichiers ont été envoyés
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'Aucune photo téléchargée.' });
            }

            // Extraire les chemins et les noms des fichiers
            const photoNames = req.files.map(file => file.filename);

            // Vérification des informations obligatoires dans le corps de la requête
            const { name, description, price, stock, categoryName } = req.body;
            if (!name || !description || !price || !stock) {
                return res.status(400).json({ error: 'Tous les champs sont requis.' });
            }

            // Vérification de l'existence de la catégorie
            //let category = await ProductCategory.findOne({ where: { name: categoryName } });


            // Préparer les données du produit
            const productData = {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                photos: photoNames.join(','),
                //categoryId: category.id,
            };


            const product = await productService.createProduct(productData);

            res.status(201).json(product);
        } catch (error) {

            console.error(error);
            res.status(500).json({ error: 'Erreur interne du serveur.' });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            await productService.deleteProduct(id);
            res.status(200).json({ message: 'Produit supprimé avec succès.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getCategories: async (req, res) => {
        try {
            const categories = await productService.getCategories();  // Récupère toutes les catégories
            res.json(categories);  // Envoie les catégories au frontend
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
            res.status(500).json({ error: 'Erreur interne du serveur.' });
        }
    }
};

module.exports = productController;
