import express from 'express';
import { escape } from 'mysql';
import {db} from '../db.js';

const categoriesRouter  = express.Router();

// Afficher toutes les catégories
categoriesRouter.get('/', (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('categories/index', { categories: results });
    });
});

// Afficher le formulaire de création de catégorie
categoriesRouter.get('/new', (req, res) => {
    res.render('categories/new.ejs');
});

// Créer une nouvelle catégorie
categoriesRouter.post('/', (req, res) => {
    const { libelle } = req.body;
    const sql = `INSERT INTO categories (libelle) VALUES (${escape(libelle)})`;
    db.query(sql, (err) => {
        if (err) throw err;
        res.redirect('/categories');
    });
});

// Afficher le formulaire de modification de catégorie
categoriesRouter.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM categories WHERE id = ${escape(id)}`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        if (!results[0]) return res.send('Category not found');
        res.render('categories/edit', { category: results[0] });
    });
});

// Modifier une catégorie
categoriesRouter.patch('/:id', (req, res) => {
    const {id} = req.params;
    const {libelle} = req.body;
    const sql = `UPDATE categories
                 SET libelle = ${escape(libelle)}
                 WHERE id = ${escape(id)}`;
    db.query(sql, (err) => {
        if (err) throw err;
        res.redirect('/categories');
    });
})


categoriesRouter.delete('/:id', async (req, res) => {
    const categoryId = req.params.id;
    console.log('del')
    try {
        //const result = await db.query('DELETE FROM categories WHERE id = categoryId', [categoryId]);
        const result = await db.query('DELETE FROM categories WHERE id = ?', [categoryId]);
        console.log('del');
        res.redirect('/categories');
        console.log('jj')
    } catch (err) {
        console.error(err);
        res.send('Erreur lors de la suppression de la catégorie');
    }
});



export {categoriesRouter }