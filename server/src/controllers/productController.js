const fs = require('fs');
const path = require('path');
const productService = require('../services/productService');

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

            if (!name || !description || !price || !stock || !categoryName) {
                return res.status(400).json({ error: 'Tous les champs sont requis.' });
            }

            const category = await productService.findCategoryByName(
                categoryName
            );

            if (!category) {
                return res.status(400).json({ error: `La catégorie '${categoryName}' n'existe pas.` });
            }

            const productData = {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                photos: photoNames.join(','),
                categoryId: category.id,
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

            // Étape 1 : Récupérer le produit à supprimer
            const product = await productService.findOneProduct(id);

            if (!product) {
                return res.status(404).json({ message: 'Produit non trouvé.' });
            }

            // Étape 2 : Supprimer les fichiers associés au produit
            const photoPaths = product.photos.split(',');

            photoPaths.forEach((photo) => {
                const filePath = path.join(__dirname, '../uploads', photo);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Erreur lors de la suppression de l'image (${photo}):`, err);
                    } else {
                        console.log(`Image supprimée : ${photo}`);
                    }
                });
            });

            await productService.deleteProduct(id);

            res.status(200).json({ message: 'Produit et images associés supprimés avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
            res.status(500).json({ error: error.message });
        }
    },

    getCategories: async (req, res) => {
        try {
            const categories = await productService.getCategories();
            res.json(categories);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
            res.status(500).json({error: 'Erreur interne du serveur.'});
        }
    },
    getProductsByCategory: async (req, res) => {
        try {
            const categoryName = decodeURIComponent(req.params.categoryName).replace(/-/g, ' ');
            const category = await productService.findCategoryByName(categoryName);
            const products = await productService.getProductsByCategory(category.id);

            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur interne du serveur.' });
        }
    },
    getOneProductWithId: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await productService.findOneProduct(productId);

            if (!product) {
                return res.status(404).json({ error: 'Produit non trouvé.' });
            }

            res.status(200).json(product);
        } catch (error) {
            console.error('Erreur lors de la récupération du produit:', error);
            return res.status(500).json({ error: 'Erreur interne du serveur.' });
        }
    }
};

module.exports = productController;