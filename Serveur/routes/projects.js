const express = require('express');
const router = express.Router();

/* GET projects listing. */
let projects = [
    {
        "name":'Project 1',
        "id":1
    },
    {
        "name":'Project 2',
        "id": 2
    },
    {
        "name":'Project 3',
        "id":3
    }
];

router.get('/', (req, res, next) => {
    res.json(projects);
});
router.get('/:projectId', (req, res, next) => {
    res.send(projects[req.params.projectId]);
});

router.post('/', (req, res, next) => {
    res.send('POST HTTP method on /projects')
});

router.get('/:projectId', (req, res, next) => {
    res.send(`GET HTTP method on projects/${req.params.projectId} resource `);
});

router.put('/:projectId', (req, res, next) => {
    res.send(`PUT HTTP method on projects/${req.params.projectId} resource`);
});

router.delete('/:projectId', (req, res, next) => {
    res.send(`DELETE HTTP method on projects/${req.params.projectId} resource`)
});

module.exports = router;
