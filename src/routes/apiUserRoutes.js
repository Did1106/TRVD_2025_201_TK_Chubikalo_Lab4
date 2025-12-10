const express = require("express");
const {
  getAll,
  getById,
  create,
  update,
  delete: remove
} = require("../controllers/apiUserController");

const { apiAuth } = require("../middleware/apiAuth");

const router = express.Router();

router.use(apiAuth);

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
