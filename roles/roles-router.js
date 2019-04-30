const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./database/rolex_db.db3"
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);

router.get("/", async (req, res) => {
  try {
    const all = await db("roles");
    return res.json(all);
  } catch (err) {
    console.log(err);
  }
  // get the roles from the database
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getOne = await db("roles")
      .where({ id: id })
      .first();
    if (getOne) {
      res.json(getOne);
    } else {
      res.status(404).json({ msg: "no id found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  // retrieve a role by id
});

router.post("/", async (req, res) => {
  try {
    const all = await db("roles").insert(req.body, "id");
    const getOne = await db("roles")
      .where({ id: all[0] })
      .first();
    if (getOne) {
      res.json(getOne);
    } else {
      res.status(404).json({ msg: "no id found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }

  // add a role to the database
});

router.put("/:id", async (req, res) => {
  // update roles
  try {
    const update = await db("roles")
      .where({ id: req.params.id })
      .update(req.body);

    if (update > 0) {
      res.json(update);
    } else {
      res.status(404).json({ msg: "records null" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // remove roles (inactivate the role)
  try {
    const deleted = await db("roles")
      .where({ id: req.params.id })
      .delete(req.body);

    if (deleted > 0) {
      res.json(deleted);
    } else {
      res.status(404).json({ msg: "records null" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
