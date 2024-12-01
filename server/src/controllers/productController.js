const productService = require('../services/productService');

const productController = {

    createProduct: async (req, res) => {
        try {

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'Aucune photo téléchargée.' });
            }

            const photoPaths = req.files.map(file => file.path);
            const photoNames = req.files.map(file => file.filename);

            if (!photoPaths) {
                return res.status(400).json({ message: 'Une photo est requise.' });
            }

            const productData = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                photos: photoNames.join(',')
            };

            const product = await productService.createProduct(productData);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
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
    // getCategories: async (req, res) => {
    //     try {
    //         const categories = await productService.getCategories();
    //         res.status(200).json(categories);
    //     } catch (error) {
    //         console.error("Erreur lors de la récupération des catégories :", error);
    //         res.status(500).json({ message: "Erreur lors de la récupération des catégories" });
    //     }
    // },
};

module.exports = productController;
