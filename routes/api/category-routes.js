const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })

    if(!categoryData) {
      res.status(404).json({message: "No category found!"});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body, {
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }

  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteData = await Category.destroy({
      where: { id: req.params.id}
    });
    if (!deleteData) {
      res.status(404).json({ message: 'No category found!'});
      return;
    }
    res.status(200).json(deleteData)
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
